import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Badge, Divider, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditComment from './EditComment';
import AddComment from './AddComment';
import EditIcon from '@mui/icons-material/Edit';
import {extractErrorMessage, userInfo} from './Login';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import toBoolean from "validator/es/lib/toBoolean";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const cardStyles = {
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1em',
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    card: {
        maxWidth: '100%',
        width: '600px',
    },
    cardMedia: {
        paddingTop: '5%',
        objectFit: 'cover',

    },
    cardContent: {
        maxHeight: '400px',
        overflow: 'auto',
    },
    comments: {
        maxHeight: '400px',
        overflow: 'auto',
    },
};

function PostCardPage() {
    const [expanded, setExpanded] = useState(false);
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [isDeleteing, setIsDeleting] = useState(false)
    const navigate = useNavigate();
    let param = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/server_posts/${param.id}`);
                setPost(response.data[0]);

                const likes_response = await axios.get(`/server_checkLike/${param.id}`)
                setIsLiked(likes_response.data.ans)
                console.log(likes_response)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, []);

    if (!post || isDeleteing) {
        return <LinearProgress color="success"/>;
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded) {
            return;
        }
        const url = '/server_comments';
        const params = {
            post_id: post.id,
        };
        axios.get(url, {params}).then((res) => {
            setComments(res.data);
            console.log(res.data);
        });
    };

    const handleLikeClick = () => {
        if (isLiked === true || !userInfo.value) {
            return;
        }
        setIsLiked(!isLiked);
        const url = '/server_posts/addLike';
        const data = {
            post_id: post.id,
        };
        axios.post(url, data).then((res) => {
            console.log(res.data);
        });
    };

    const handleDeletePost = () => {
        if (!userInfo.value || post.user_email !== userInfo.value.email) {
            alert('Please login to the post owner\'s user to delete.');
            return;
        }
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) {
            return; // If the user cancels, exit the function
        }
        setIsDeleting(true)
        const url = '/server_deletePost';
        const data = {
            post_id: post.id,
        };
        axios
            .post(url, data)
            .then((res) => {
                console.log(res.data);
                alert('Deleted successfully');
                setIsDeleting(false)
                navigate('/');
            })
            .catch((err) => {
                alert(extractErrorMessage(err.response.data));
                setIsDeleting(false)
            });
    };

    const handleEditPost = () => {
        if (!userInfo.value || post.user_email !== userInfo.value.email) {
            alert('Please login to the post owner\'s user to edit.');
            return;
        }
        navigate(`/EditPost/${post.id}`);
    };

    return (
        <div style={cardStyles.cardContainer}>
            <Card sx={cardStyles.card}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}}
                                aria-label="recipe"> {/*onClick={() => navigate("/Profile/")}>*/}
                            {post.author[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={post.title}
                    subheader={post.created_at}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={post.imgURL}
                    alt=""
                    height="250"
                    sx={cardStyles.cardMedia}
                />
                <CardContent sx={cardStyles.cardContent}>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <Badge badgeContent={post.likes_count} color="primary">
                            <FavoriteIcon
                                onClick={handleLikeClick}
                                sx={{color: isLiked ? '#FF7F50' : 'gray'}}
                            />
                        </Badge>
                    </IconButton>
                    <IconButton>
                        <DeleteIcon onClick={handleDeletePost}/>
                    </IconButton>
                    <IconButton>
                        <EditIcon onClick={handleEditPost}/>
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <UnfoldMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <h4>Comments</h4>
                        <List sx={cardStyles.comments}>
                            <AddComment post_id={post.id}/>
                            {comments.map((comment) => (
                                <React.Fragment key={comment.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar sx={{bgcolor: 'grey'}} aria-label="recipe">
                                                {comment.author[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={comment.author} secondary={comment.comment}/>
                                    </ListItem>
                                    {/*<ListItem>*/}
                                    {/*    <EditComment comment_id={comment.id}/>*/}
                                    {/*</ListItem>*/}
                                    <Divider variant="inset" component="li"/>
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default PostCardPage;
