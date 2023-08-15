import TextField from "@mui/material/TextField";
import {Button, Grid, Stack} from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import React, {useState} from "react";
import {userInfo} from "./Login";
import axios from "axios";

function AddComment(props) {

    const [content, setContent] = useState("")

    const handleSubmit = () => {
        if (!userInfo.value) {
            alert("please login")
            return;
        }
        const url = "/server_comments";

        const data = {
            post_id: props.post_id,
            user_email: userInfo.value.email,
            comment: content
        }
        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                window.location.reload()
            });
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <TextField
                    id="content"
                    label="Comment"
                    multiline
                    rows={1}
                    variant="filled"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    helperText="Add Comment"
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    type="submit"
                    startIcon={<AddCommentIcon/>}
                    onClick={() => handleSubmit()}
                >
                    Publish
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddComment;