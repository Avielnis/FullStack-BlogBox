import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Grid, CardActionArea, LinearProgress} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {useState, useEffect} from "react";
import axios from 'axios';

function PostsCards(props) {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const getAllPosts = () => {
            let url = "/server_posts";

            // this IF is used by profile page to get all the post of the loged-in profile
            // it adds to the url the email and because of that a different api call is preformed
            if (props.email) {
                url = `/server_posts/${props.email}`;
            }
            if (props.popularLikes) {
                url = '/server_popularLikes';
            }
            if (props.popularCommented) {
                url = '/server_popularCommented'
            }

            axios.get(url).then((res) => {
                setPosts(res.data);
                setLoad(false);
            });

        };

        getAllPosts();
    }, []);


    return (
        <div>
            {load ? <LinearProgress color="success"/> : (

                <Grid container spacing={2} sx={{padding: 4}}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={3} key={post.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },

                                }}
                                onClick={() => navigate(`/posts/${post.id}`)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        sx={{padding: "1em 1em 0 1em", objectFit: "contain"}}
                                        image={post.imgURL}
                                        alt=""
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.content.length <= 50 ? post.content : post.content.substring(0, 50) + " ..."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{
                            position: 'fixed',
                            bottom: '16px',
                            right: '16px',
                        }}
                        onClick={() => navigate('/newPost')}
                    >
                        <AddIcon/>
                    </Fab>
                </Grid>
            )}
        </div>
    );
}

export default PostsCards;