from settings import aws_Secret_access_key, aws_Access_key
import boto3
from botocore.config import Config
from flask import abort
from urllib.parse import urlparse, unquote
import requests

s3 = boto3.client(
    's3',
    aws_access_key_id=aws_Access_key,
    aws_secret_access_key=aws_Secret_access_key,
    config=Config(signature_version='s3v4'),
    region_name="eu-central-1"
)

BUCKET_NAME = 'aviel-nisanov-bucket'


def get_file_url(file):
    # url = s3.generate_presigned_url('get_object',
    #                                 Params={'Bucket': BUCKET_NAME, 'Key': file.filename},
    #                                 ExpiresIn=1)
    url = s3.generate_presigned_url('get_object',
                                    Params={'Bucket': BUCKET_NAME, 'Key': file.filename})
    return url


def check_file_url(url):
    response = requests.get(url)
    if response.status_code != 403:
        return url
    else:
        file_key = parse_url_to_file_key(url)
        return get_file_url(FileWrapper(file_key))


def upload_file(file):
    if not file.content_type.startswith('image'):
        abort(415, "please upload only: jpeg, jpg, png, gif, bmp, tiff, webp.")
    resp = s3.upload_fileobj(file, BUCKET_NAME, file.filename, ExtraArgs={'ACL': 'public-read'})
    return resp


def parse_url_to_file_key(url):
    parsed_url = urlparse(url)
    file_key = parsed_url.path.lstrip('/')
    file_key = unquote(file_key)
    return file_key


def delete_file(url):
    file_key = parse_url_to_file_key(url)
    resp = s3.delete_object(Bucket=BUCKET_NAME, Key=file_key)
    return resp


def get_all_files():
    files_obj = []
    response = s3.list_objects_v2(Bucket=BUCKET_NAME)
    for obj in response['Contents']:
        print(obj['Key'])
        files_obj.append(obj)
    return files_obj


def get_next_file_id():
    with open("s3_next_name_id.txt", "r+") as file:
        num = int(file.read())
        file.seek(0)
        file.write(str(num + 1))
        return str(num)


#
# def download_file():
#     # Download a file from the bucket
#     file_name_in_s3 = 'first picture to aws.jpg'
#     download_file_name_path = r'C:\Users\aviel\IDC\Full-Stack\Week 12\downloaded.jpg'
#     s3.download_file(bucket_name, file_name_in_s3, download_file_name_path)
#
#
# def upload_to_s3():
#     file_path = r'C:\Users\aviel\IDC\Full-Stack\Week 12\example.txt'
#     file_name = 'example.txt'
#     s3.upload_file(file_path, bucket_name, file_name)

class FileWrapper:
    def __init__(self, content_str):
        self.filename = content_str
