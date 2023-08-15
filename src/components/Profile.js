import React from 'react';
import {extractErrorMessage, userInfo} from "./Login";
import {Button, Grid, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Person as PersonIcon} from "@mui/icons-material";
import {Email as EmailIcon} from "@mui/icons-material";
import PostsCards from "./PostsCards";
import KeyIcon from '@mui/icons-material/Key';
import Link from "@mui/material/Link";

function Profile() {


    return (
        !userInfo.value ? (
            <div>
                <h1>Please login!</h1>
            </div>
        ) : (
            <div>
                <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar
                                src={userInfo.value.profile_img}
                                alt="Profile Image"
                                style={{width: '100px', height: '100px'}}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">{userInfo.value.full_name}</Typography>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item>
                                    <EmailIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{userInfo.value.email}</Typography>
                                </Grid>
                                <Grid item>
                                    <PersonIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">{userInfo.value.role}</Typography>
                                </Grid>
                                <Grid item>
                                    <KeyIcon/>
                                </Grid>
                                <Grid item>
                                    <Typography component="a" href={"/EditPassword"} color="primary">
                                        Edit Password
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                    <h2>My posts</h2>
                    <PostsCards email={userInfo.value.email}/>
                </Paper>
            </div>
        )
    );
}

export default Profile;