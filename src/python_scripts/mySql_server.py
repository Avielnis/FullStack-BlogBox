import bcrypt
from flask import Flask, request, jsonify, abort, make_response
import mysql.connector as mysql
import uuid
from settings import dbpass
from sqlToJsonConverter import convert_to_json
import aws_s3_handler as aws
import confiramtion_email
import json

## for deployment
pool = mysql.pooling.MySQLConnectionPool(
    host="aviel-nisanov-blog-db.cbrdyb6rueag.eu-central-1.rds.amazonaws.com",
    user="admin",
    passwd=dbpass,
    database="blog",
    buffered=True,
    pool_size=5,
    pool_name="blog_aviel"
)

app = Flask(__name__,
            static_folder=r'C:\Users\Aviel\IDC\Full-stack\finalBlog\build',
            static_url_path='/')


@app.route('/Welcome')
@app.route('/About')
@app.route('/NewPost')
@app.route('/posts')
@app.route('/Login')
@app.route('/Profile')
@app.route('/Logout')
@app.route('/SignUp')
@app.route('/forgotPass')
@app.route('/EditPassword')
@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/posts/<post_id>')
@app.route('/EditPost/<post_id>')
def index2(post_id):
    return app.send_static_file('index.html')


# #### for local use
# pool = mysql.pooling.MySQLConnectionPool(
#     host="localhost",
#     user="root",
#     passwd=dbpass,
#     database="blog",
#     buffered=True,
#     pool_size=5,
#     pool_name="blog_aviel"
# )
# app = Flask(__name__)

INDEX_OF_CREATED_AT = 4


#######################################################
#                      POSTS
#######################################################
@app.route('/server_posts', methods=['GET', 'POST', 'PUT'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    elif request.method == 'POST':
        return add_post()
    else:
        return update_post()


def get_all_posts():
    db = pool.get_connection()
    query = "select posts.id, users.full_name, title, content, created_at, imgURL, likes_count from posts join " \
            "users ON posts.user_email = users.email order by created_at desc"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['id', 'author', 'title', 'content', 'created_at', 'imgURL', 'likes_count']
    return convert_to_json(records, header, time_index=INDEX_OF_CREATED_AT, img_index=5)


@app.route('/server_deletePost', methods=['POST'])
def delete_post():
    data = request.get_json()
    post_id = data['post_id']
    imgURL = get_img_url(post_id)
    owner_user_email = get_user_email_by_post(post_id)
    if not authenticate_user(owner_user_email):
        abort(403, "You cant delete this post, please login to post owner account")
    delete_all_comment_of(post_id)
    db = pool.get_connection()
    deleted_post = get_post(post_id)
    query = "delete from posts where id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    aws.delete_file(imgURL)
    return deleted_post


@app.route('/server_posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    db = pool.get_connection()
    query = "select users.full_name, posts.id,user_email,title,created_at,content,imgURL,likes_count " \
            "from posts join users on users.email = posts.user_email where posts.id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    checked_img_url = aws.check_file_url(records[0][6])
    if checked_img_url != records[0][6]:
        return update_imgURL_and_get_post(post_id, checked_img_url)
    header = ['author', 'id', 'user_email', 'title', 'created_at', 'content', 'imgURL', 'likes_count']
    return convert_to_json(records, header, time_index=INDEX_OF_CREATED_AT)


@app.route('/server_posts/<string:email>', methods=['GET'])
def get_all_post_by_user_email(email):
    db = pool.get_connection()
    query = "select users.full_name, posts.id,user_email,title,created_at,content,imgURL,likes_count " \
            "from posts join users on users.email = posts.user_email where posts.user_email = %s"
    values = (email,)
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['author', 'id', 'user_email', 'title', 'created_at', 'content', 'imgURL', 'likes_count']
    return convert_to_json(records, header, time_index=INDEX_OF_CREATED_AT, img_index=6)


def add_post():
    session_id = request.cookies.get("session_id")
    if not session_id:
        abort(401, "Please login")
    user_id = get_session(session_id)['user_id']
    logdin_user_email = get_user_email_by_user(user_id)

    # default x image
    imgURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png'
    if len(request.files) != 0:
        img_file = request.files['imgURL']
        img_file.filename = f"id_{aws.get_next_file_id()}__{img_file.filename}"
        aws.upload_file(img_file)
        imgURL = aws.get_file_url(img_file)

    data = request.form
    db = pool.get_connection()
    query = "insert into posts (user_email,title,content,imgURL) values (%s, %s, %s, %s)"
    values = (logdin_user_email, data['title'], data['content'], imgURL)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    db.close()
    return get_post(new_post_id)


def update_post():
    data = request.form
    imgURL = ""
    if len(request.files) != 0:
        img_file = request.files['imgURL']
        img_file.filename = f"id_{aws.get_next_file_id()}__{img_file.filename}"
        aws.upload_file(img_file)
        imgURL = aws.get_file_url(img_file)
    else:
        imgURL = data['imgURL']

    data = request.form
    owner_user_email = get_user_email_by_post(data['post_id'])
    if not authenticate_user(owner_user_email):
        abort(403, f"This post was writen by {owner_user_email}, You cant edit this post")

    old_img_url = get_img_url(data['post_id'])
    db = pool.get_connection()
    query = "update posts set title = %s, content=%s, imgURL=%s where id = %s"
    values = (data['title'], data['content'], imgURL, data['post_id'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    aws.delete_file(old_img_url)
    return get_post(int(data['post_id']))


#######################################################
#                      IMG
#######################################################

def get_img_url(post_id):
    db = pool.get_connection()
    query = "select imgURL from posts where id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    return record[0]


def get_profile_img(user_id):
    db = pool.get_connection()
    query = "select profile_img from users where id = %s"
    values = (user_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    return record[0]


def update_imgURL_and_get_post(post_id, new_url):
    db = pool.get_connection()
    query = "update posts set imgURL = %s where id = %s"
    values = (new_url, post_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    query = "select users.full_name, posts.id,user_email,title,created_at,content,imgURL,likes_count " \
            "from posts join users on users.email = posts.user_email where posts.id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['author', 'id', 'user_email', 'title', 'created_at', 'content', 'imgURL', 'likes_count']
    return convert_to_json(records, header, time_index=INDEX_OF_CREATED_AT)


#######################################################
#                      COMMENTS
#######################################################
@app.route('/server_comments', methods=['GET', 'POST', 'PUT'])
def manage_comments():
    if request.method == 'GET':
        post_id = request.args.get('post_id')
        return get_all_comments_by_post_id(post_id)
    elif request.method == 'POST':
        return add_comment()
    else:
        data = request.get_json()
        comment_id = data['comment_id']
        content = data['content']
        return update_comment(comment_id, content)


def update_comment(comment_id, content):
    db = pool.get_connection()
    query = "update comments set comment = %s where id = %s"
    values = (content, comment_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return get_comment_by_id(comment_id)


def get_all_comments_by_post_id(post_id):
    db = pool.get_connection()
    query = "select comments.id, user_email,comment,full_name from comments join users on comments.user_email = users.email " \
            "where comments.post_id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    return convert_to_json(record, ['id', 'user_email', 'comment', 'author'])


def get_comment_by_id(comment_id):
    db = pool.get_connection()
    query = "select post_id,user_email,comment,id from comments where id = %s"
    values = (comment_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    return convert_to_json(record, ['post_id', 'user_email', 'comment', 'id'])


def add_comment():
    db = pool.get_connection()
    data = request.get_json()
    query = "insert into comments (post_id,user_email,comment) values (%s,%s,%s)"
    values = (data['post_id'], data['user_email'], data['comment'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_comment_id = cursor.lastrowid
    cursor.close()
    db.close()
    return get_comment_by_id(new_comment_id)


def delete_all_comment_of(post_id):
    db = pool.get_connection()
    query = "delete from comments where post_id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()


#######################################################
#                      LIKES
#######################################################
@app.route('/server_posts/addLike', methods=['POST'])
def add_like():
    data = request.get_json()
    post_id = str(data['post_id'])
    like_exist = is_like_exsits(post_id)
    if like_exist["ans"]:
        abort(403, "user already liked this post")
    add_like_to_users_likes(post_id, like_exist["user_id"])
    db = pool.get_connection()
    query = "update posts set likes_count = likes_count + 1 where id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return get_post(data['post_id'])


@app.route('/server_checkLike/<int:post_id>', methods=['GET'])
def is_like_exsits(post_id):
    user_id = get_user_id_by_cookie()
    db = pool.get_connection()
    query = "select user_id,post_id from users_likes where user_id=%s and post_id=%s"
    values = (user_id, post_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    if not record:
        return {"ans": False, "user_id": user_id}
    return {"ans": True, "user_id": user_id}


def add_like_to_users_likes(post_id, user_id):
    query = "insert into users_likes (user_id,post_id) values (%s,%s)"
    values = (user_id, post_id)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()


#######################################################
#                      SIGHUP
#######################################################

@app.route('/server_signup', methods=['POST'])
def add_user():
    db = pool.get_connection()
    data = request.form
    if user_exists(data['email']):
        db.close()
        abort(401, 'This email already exists')
    imgURL = ""
    if len(request.files) != 0:
        img_file = request.files['profile_img']
        img_file.filename = f"id_{aws.get_next_file_id()}__{img_file.filename}"
        aws.upload_file(img_file)
        imgURL = aws.get_file_url(img_file)

    query = "insert into users (email,password,full_name,profile_img) values (%s,%s,%s,%s)"
    pwd = data['password']
    hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
    values = (data['email'], hashed_pwd, data['full_name'], imgURL)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_user_id = cursor.lastrowid
    cursor.close()
    db.close()
    confiramtion_email.send_confirm_email(data['email'], data['full_name'])
    return get_user(new_user_id)


def user_exists(user_email):
    db = pool.get_connection()
    query = "select id from users where email = %s"
    values = (user_email,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    return len(record) != 0


#######################################################
#                      LOGOUT
#######################################################

@app.route('/server_logout', methods=['POST'])
def logout():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    if not session_id:
        db.close()
        abort(404, "No User to logout,\n Session was not found")
    query = "delete from users_sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    response = make_response('User logout successfully')
    response.delete_cookie('session_id')
    return response


#######################################################
#                      LOGIN
#######################################################

@app.route('/server_users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    db = pool.get_connection()
    query = "select id,email,full_name,role,profile_img from users where id = %s"
    values = (user_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['id', 'email', 'full_name', 'role', 'profile_img']
    return convert_to_json(record, header)


@app.route('/server_login', methods=['POST'])
def login_user():
    db = pool.get_connection()
    data = request.get_json()
    query = "select id, email, password,full_name, role,profile_img from users where email = %s"
    values = (data['email'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    if not record or not data['email']:
        abort(401, f"Email {values[0]} was not found")

    hashed_pass = record[2].encode('utf-8')  # password index
    if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pass) != hashed_pass:
        abort(401, "Wrong password")

    header = ['id', 'email', 'full_name', 'role', 'profile_img']
    record = list(record)
    del record[2]  # password index
    session_id = str(uuid.uuid4())
    resp = make_response(convert_to_json([record], header))
    resp.set_cookie("session_id", value=session_id, path="/")
    add_session(session_id, record[0])
    return resp


def get_user_email_by_user(user_id):
    db = pool.get_connection()
    query = "select email from users where id = %s"
    values = (user_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    return record[0]


def get_user_email_by_post(post_id):
    db = pool.get_connection()
    query = "select user_email from posts where id = %s"
    values = (post_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    return record[0]


def get_user_name_by(email):
    query = "select full_name from users where email = %s"
    values = (email,)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    return record[0]


def get_user_by(email):
    query = "select id, email, full_name, role, profile_img from users where email = %s"
    values = (email,)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['id', 'email', 'full_name', 'role', 'profile_img']
    return convert_to_json(record, header), record[0][0]


@app.route("/server_forgotPass", methods=['PUT'])
def forgot_pass():
    data = request.get_json()
    if not user_exists(data['email']):
        abort(401, f"There is no user that exists with {data['email']} email")
    query = "update users set password = %s where email = %s"
    new_pwd = confiramtion_email.generate_random_password()
    new_hashed_pwd = bcrypt.hashpw(new_pwd.encode('utf-8'), bcrypt.gensalt())
    values = (new_hashed_pwd, data['email'])
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    user_full_name = get_user_name_by(data['email'])
    confiramtion_email.send_forgot_password_email(data['email'], user_full_name, new_pwd)
    return {"message": "successes"}


@app.route("/server_changePassword", methods=['PUT'])
def change_password():
    data = request.get_json()
    # authenticate_user(data["user_email"])
    user_email = json.loads(get_user_by_cookie())[0]["email"]

    # get users old password
    query = "select password from users where email = %s"
    values = (user_email,)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()

    old_pass = record[0].encode('utf-8')
    if bcrypt.hashpw(data['old_pass'].encode('utf-8'), old_pass) != old_pass:
        abort(401, "Wrong old password")

    # change to the new password
    hashed_new_pass = bcrypt.hashpw(data['new_pass'].encode('utf-8'), bcrypt.gensalt())
    query = "update users set password = %s where email= %s"
    values = (hashed_new_pass, user_email,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return {"message": "successes"}


#######################################################
#                   SESSION LOGIN
#######################################################
@app.route('/server_login_session', methods=['POST'])
def get_user_by_cookie():
    session_id = request.cookies.get("session_id")
    if not session_id:
        abort(401, "No user session exists - Please Login")
    user_id = get_session(session_id)['user_id']
    return get_user(user_id)


def add_session(session_id, user_id):
    db = pool.get_connection()
    query = "insert into users_sessions (session_id,user_id) values (%s,%s)"
    values = (session_id, user_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return get_session(session_id);


def get_session(session_id):
    db = pool.get_connection()
    query = "select session_id,user_id from users_sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    header = ['session_id', 'user_id']
    return dict(zip(header, record))


def authenticate_user(owner_user_email):
    session_id = request.cookies.get("session_id")
    if not session_id:
        return False
    user_id = get_session(session_id)['user_id']
    logdin_user_email = get_user_email_by_user(user_id)
    return owner_user_email == logdin_user_email


def get_user_id_by_cookie():
    session_id = request.cookies.get("session_id")
    if not session_id:
        abort(401, "No user session exists - Please Login")
    return get_session(session_id)['user_id']


#######################################################
#                   SOCIAL LOGIN
#######################################################

@app.route('/server_login_social', methods=["POST"])
def login_social():
    data = request.get_json()
    if not user_exists(data["email"]):
        db = pool.get_connection()
        query = "insert into users (email,password,full_name,profile_img) values (%s,%s,%s,%s)"
        pwd = confiramtion_email.generate_random_password()
        hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
        values = (data['email'], hashed_pwd, data['full_name'], data["profile_img"])
        cursor = db.cursor()
        cursor.execute(query, values)
        db.commit()
        cursor.close()
        db.close()
        confiramtion_email.send_confirm_email(data['email'], data['full_name'])

    user, user_id = get_user_by(data["email"])
    session_id = str(uuid.uuid4())
    resp = make_response(user)
    resp.set_cookie("session_id", value=session_id, path="/")
    add_session(session_id, user_id)
    return resp


if __name__ == '__main__':
    app.run()
