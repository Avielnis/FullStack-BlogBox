import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {AccountCircle} from "@mui/icons-material";
import {Button, Stack} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function EditComment(props) {

    const [edit_comment, setEdit_comment] = useState(false);
    const [content, setContent] = useState("")
    const edit = () => {
        console.log(props.comment_id)
        setEdit_comment(true)

    }
    const handleSubmit = () => {
        console.log("Publishing")
        const url = "/server_comments";
        const params = {
            comment_id: props.comment_id,
            content: content
        }
        axios.put(url, params)
            .then((res) => {
                console.log(res.data)
                window.location.reload()
            });
    }

    return (
        <div>
            {!edit_comment ? (
                <Typography
                    component="span"
                    variant="body1"
                    style={{
                        color: 'blue',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => edit()}
                >edit comment</Typography>
            ) : (
                <Stack>
                    <TextField
                        id="content"
                        label="Content"
                        multiline
                        rows={2}
                        variant="filled"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        helperText="What is on your mind?"
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<AccountCircle/>}
                        onClick={() => handleSubmit()}>Publish</Button>
                </Stack>

            )}
        </div>
    )
}

export default EditComment;