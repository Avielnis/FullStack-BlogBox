import {Alert, AlertTitle, Button, LinearProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import UpdateIcon from '@mui/icons-material/Update';
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {extractErrorMessage, userInfo} from "./Login";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {styled} from "@mui/material/styles";

function EditPost() {

    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('')
    const [Img, setImg] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [fetched, setFechted] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false)
    const [imgUploaded, setImgUploaded] = useState(false)
    const navigate = useNavigate()
    let param = useParams();

    const FileInput = styled('input')({
        display: 'none',
    });

    const fetchPost = async () => {
        if (fetched) {
            return;
        }
        axios.get(`/server_posts/${param.id}`).then((res) => {
            const post = res.data[0];
            setContent(post.content)
            setImg(post.imgURL)
            setTitle(post.title)
            setFechted(true)
        });
    }
    fetchPost()


    const handleSubmit = event => {
        event.preventDefault();
        debugger;
        if (!userInfo.value) {
            setErrorMessage('Please login to edit the post.');
            return;
        }
        if (!Title || !Content) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        setSubmitClicked(true)
        let ImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png'
        if (Img.length !== 0) {
            ImgUrl = Img
        }
        const url = "/server_posts";

        const data = {
            title: Title,
            content: Content,
            imgURL: ImgUrl,
            post_id: param.id,
            user_email: userInfo.value.email
        }
        axios.put(url, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                console.log(res.data);
                setSubmitted(true)
            }).catch((err) => {
            setErrorMessage(extractErrorMessage(err.response.data))
            setSubmitted(false)
            setSubmitClicked(false)
        });

    };

    useEffect(() => {
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
            {!fetched ? (<LinearProgress color="success"/>) : (
                <Stack
                    spacing={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: {xs: '90%', sm: '80%', md: '50ch'} // Responsive width
                        },
                        alignItems: "center",
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
                            {submitted ? (
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
                            ) : (<></>)}

                        </Stack>
                    ) : (
                        <Stack alignItems="center">
                            <Typography variant="h4" component="h1" gutterBottom
                                        sx={{fontWeight: 'bold', color: 'primary.main'}}>
                                Edit Post
                            </Typography>
                            {errorMessage && (
                                <Typography color="error" variant="body2">
                                    <Alert severity="warning">{errorMessage}</Alert>
                                </Typography>
                            )}

                            <TextField required id="title" type="title" label="Title" variant="filled"
                                       onChange={(e) => setTitle(e.target.value)}
                                       helperText="Your title" value={Title}
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
                            {imgUploaded ? (
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={URL.createObjectURL(Img)}
                                    alt=""
                                    height="250"
                                    sx={{marginBottom: '16px'}}
                                />
                            ) : (
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={Img}
                                    alt=""
                                    height="250"
                                    sx={{marginBottom: '16px'}}
                                />
                            )}
                            <div style={{marginBottom: '16px', alignItems: "self-start"}}>
                                <Button variant="outlined" component="label" startIcon={<UploadFileIcon/>}>
                                    Upload Image
                                    <FileInput type="file"
                                               onChange={(e) => {
                                                   setImg(e.target.files[0]);
                                                   setImgUploaded(true)
                                               }}
                                    />
                                </Button>
                                {imgUploaded && <p>Selected file: {Img.name}</p>}
                            </div>
                            <Button
                                variant="contained"
                                type="submit"
                                startIcon={<UpdateIcon/>}
                                onSubmit={handleSubmit}>Update</Button>
                        </Stack>
                    )}

                </Stack>
            )}
        </div>
    )
}

export default EditPost;