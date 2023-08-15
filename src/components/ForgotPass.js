import React from "react";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import axios from "axios";
import {extractErrorMessage, userInfo} from "./Login";
import {Alert, Button, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

function ForgotPass(){
    const [email,setEmail] = useState('');
    const [errorMassage,setErrorMassage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/server_forgotPass";
        const data = {
            email: email,
        }
        axios.put(url, data)
            .then((res) => {
                navigate('/')
            }).catch((err) => {
            setErrorMassage(extractErrorMessage(err.response.data));
        });
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    return(
        <Stack
            spacing={2}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiLink-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'left',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h1>Reset Password</h1>
            {errorMassage && (
                <Alert severity="error">{errorMassage}</Alert>
            )}
            <Typography variant="body2" color="text.secondary">
                No worries! We've got you covered.<br />
                Enter the email address associated with your account,<br />
                and we'll send you instructions on how to reset your password.<br /><br />

                Check your inbox and follow the steps provided to regain access.<br />
                Remember to check your spam folder if you don't receive the email within a few minutes.<br /><br /><br />
            </Typography>
            <TextField id="email" type="email" label="Email" variant="filled"
                       onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
            <Button variant="contained" onClick={handleSubmit}>Send</Button>
        </Stack>
    );
}
export default ForgotPass;