import PostsCards from "./PostsCards";
import {Paper} from "@mui/material";
import React from "react";

function Popular() {


    return (
        <div>
            <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                <h2>Top 4 Most Liked Posts</h2>
                <PostsCards popularLikes={true}/>
            </Paper>
            <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                <h2>Top 4 Most Commented Posts</h2>
                <PostsCards popularCommented={true}/>
            </Paper>
        </div>
    );
}

export default Popular;