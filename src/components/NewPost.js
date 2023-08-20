import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Stack, Button, LinearProgress, Alert, AlertTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AccountCircle} from "@mui/icons-material";
import axios from "axios";
import {extractErrorMessage, userInfo} from "./Login";
import {styled} from "@mui/material/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CardMedia from "@mui/material/CardMedia";

function NewPost() {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('')
    const [Img, setImg] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate()

    const FileInput = styled('input')({
        display: 'none',
    });

    const handleSubmit = event => {
        event.preventDefault();

        if (!userInfo.value) {
            setErrorMessage('Please login to add new post.');
            return;
        }
        if (!Title || !Content) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        setSubmitClicked(true)

        const url = "/server_posts";

        const data = {
            title: Title,
            content: Content,
            imgURL: Img
        }
        axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                setSubmitted(true)
            }).catch((err) => {
            setSubmitClicked(false)
            setErrorMessage(extractErrorMessage(err.response.data))
        });

    };

    useEffect(() => {

        if (!userInfo.value){
            setErrorMessage("Please Login!");
        }

        if (submitted) {
            setTimeout(() => {
                setSubmitted(false);
                setSubmitClicked(false)
                navigate('/posts');
            }, 1000);
        }
    }, [submitted]);


    return (
        <div>
            <Stack
                spacing={2}
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1,
                        width: {xs: '90%', sm: '80%', md: '50ch'} // Responsive width
                    },
                    alignItems: "center",
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column'

                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                {submitClicked ? (
                    <Stack
                        sx={{width: '100%', color: 'grey.500'}} spacing={2}
                    >

                        <LinearProgress color="success"/>
                        {submitted ? (<div>
                            <Typography
                                level="body3"
                                fontWeight="xl"
                                textColor="common.white"
                                sx={{mixBlendMode: 'difference'}}
                            >

                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Post submitted. Redirecting...
                                </Alert>
                            </Typography>
                        </div>) : (<div></div>)}
                    </Stack>
                ) : (
                    <Stack alignItems="center">
                        <Typography variant="h4" component="h4" gutterBottom
                                    sx={{fontWeight: 'bold', color: 'primary.main'}}>
                            New Post
                        </Typography>
                        {errorMessage && (
                            <Typography color="error" variant="body2">
                                <Alert severity="warning">{errorMessage}</Alert>
                            </Typography>
                        )}

                        <TextField required id="title" type="title" label="Title" variant="filled"
                                   onChange={(e) => setTitle(e.target.value)}
                                   helperText="Your title"
                        />
                        <TextField
                            id="content"
                            label="Content"
                            multiline
                            rows={4}
                            variant="filled"
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            helperText="What is on your mind?"
                        />
                        <div style={{marginBottom: '16px', alignItems: "self-start"}}>
                            <Button variant="outlined" component="label" startIcon={<UploadFileIcon/>}>
                                Upload Image
                                <FileInput type="file"
                                           onChange={(e) => setImg(e.target.files[0])}
                                />
                            </Button>
                            {Img && <p>Selected file: {Img.name}</p>}
                            {Img && (
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={URL.createObjectURL(Img)}
                                    alt=""
                                    height="250"
                                    sx={{marginBottom: '16px'}}
                                />
                            )}
                        </div>
                        <Button
                            variant="contained"
                            type="submit"
                            startIcon={<AccountCircle/>}
                            onSubmit={handleSubmit}>Post!</Button>
                    </Stack>
                )}

            </Stack>
        </div>
    );
}

export default NewPost;



