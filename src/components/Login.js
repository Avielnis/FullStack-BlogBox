import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Alert, Stack} from "@mui/material";
import {Button} from "@mui/material";
import SignUp from "./SignUp";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn_v1 from "./GoogleSighIn_v1";
import GoogleSignIn_v2 from "../not_used_components/GoogleSignIn_v2";


export const extractErrorMessage = (htmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const paragraph = doc.querySelector('p');
    return paragraph.textContent;
}


export let userInfo = {
    value: null,
    set(newValue) {
        this.value = newValue;
    }
};

export const loginWithSession = () => {
    const url = "/server_login_session";
    const data = {};
    axios.post(url, data)
        .then((res) => {
            userInfo.set(res.data[0])
        }).catch((err) => {

    });
}


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginError("");
        const url = "/server_login";
        const data = {
            "email": email,
            "password": password,
        }
        axios.post(url, data, {withCredentials: true})
            .then((res) => {
                console.log(res)
                userInfo.set(res.data[0])
                navigate('/')
            }).catch((err) => {
            setLoginError(extractErrorMessage(err.response.data));
        });
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Stack
                spacing={2}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                    '& .MuiLink-root': {m: 1, width: '25ch'},
                    alignItems: "center",
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >

                <h1>Login</h1>
                {loginError && (
                    <Alert severity="error">{loginError}</Alert>
                )}
                <TextField id="email" type="email" label="Email" variant="filled"
                           onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown}/>
                <TextField
                    id="password"
                    label="Password"
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Link component="button" variant="body2" onClick={() => {
                    navigate('/forgotPass');
                }}>Forgot Password?</Link>
                <Button variant="contained" onClick={handleSubmit}>Login</Button>

                {/*<GoogleSignIn_v1/>*/}
                <GoogleSignIn_v2/>
                <FacebookSignIn/>
            </Stack>
        </div>
    )
}

export default Login;