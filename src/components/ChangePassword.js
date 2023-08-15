import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useState} from "react";
import {Alert, AlertTitle, LinearProgress, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {extractErrorMessage, userInfo} from "./Login";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate()

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newPassword || !repeatPassword) {
            setErrorMessage('Please fill in all the fields');
            return;
        }
        if (newPassword !== repeatPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        const url = "/server_changePassword"
        const data = {
            // "user_email": userInfo.value.email,
            "old_pass": oldPassword,
            "new_pass": newPassword
        }
        setSubmitted(true)
        axios.put(url, data, {withCredentials: true})
            .then((res) => {
                alert("Password Changes Successfully")
                navigate('/login')
            }).catch((err) => {
            setErrorMessage(extractErrorMessage(err.response.data));
            setSubmitted(false)
        });
    }


    return (
        // <>
        //     {userInfo.value == null ? (
        //         <Alert severity="error">
        //             <AlertTitle>Error!</AlertTitle>
        //             Please Login!
        //         </Alert>
        //     ) : (
        <>
            {submitted ? (<LinearProgress color="success"/>) : (
                <Stack
                    spacing={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                        '& .MuiLink-root': {m: 1, width: '25ch'},
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}

                >
                    <h1>Change Password</h1>

                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            <Alert severity="warning">{errorMessage}</Alert>
                        </Typography>
                    )}

                    <TextField
                        id="old_password"
                        label="Old Password"
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
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
                    <TextField
                        id="new_password"
                        label="New Password"
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    <TextField
                        id="repeat_password"
                        label="Repeat Password"
                        variant="filled"
                        type={showPassword ? 'text' : 'password'}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
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
                    <Button variant="contained" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Stack>
            )
            }</>)
// }</>)

}

export default ChangePassword;