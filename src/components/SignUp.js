import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, LinearProgress, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { extractErrorMessage } from './Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {styled} from "@mui/material/styles";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [full_name, setFull_name] = useState('');
  const [profile_img, setProfile_img] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [imgUploaded, setImgUploaded] = useState(false)

  const FileInput = styled('input')({
    display: 'none',
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password || !full_name || !repeatPassword) {
      setErrorMessage('Please fill in all the fields');
      return;
    }
    if (!isEmail(email)) {
      setErrorMessage('Email is not valid');
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const url = '/server_signup';
    const data = {
      email: email,
      password: password,
      full_name: full_name,
      profile_img: profile_img,
    };

    axios
      .post(url, data,{headers: {'Content-Type': 'multipart/form-data'}})
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
      })
      .catch((err) => {
        setErrorMessage(extractErrorMessage(err.response.data));
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

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        navigate('/');
      }, 3000);
    }
  }, [submitted]);

  return (
    <div>
      <Stack
        spacing={2}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& .MuiLink-root': { m: 1, width: '25ch' },
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {submitted && (
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="success" />
            <Typography
              level="body3"
              fontWeight="xl"
              textColor="common.white"
              sx={{ mixBlendMode: 'difference' }}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Redirecting...<br />
                Please Login
              </Alert>
            </Typography>
          </Stack>
        )}

        <h1>Sign Up</h1>

        {errorMessage && (
          <Typography color="error" variant="body2">
            <Alert severity="warning">{errorMessage}</Alert>
          </Typography>
        )}

        <TextField
          id="email"
          type="email"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="repeat_password"
          label="Repeat Password"
          variant="filled"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          id="full_name"
          label="Full Name"
          variant="filled"
          type="text"
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div style={{marginBottom: '16px', alignItems: "self-start"}}>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon/>}>
            Profile Image
            <FileInput type="file"
                       onChange={(e) => {
                         setProfile_img(e.target.files[0]);
                         setImgUploaded(true)
                       }}
            />
          </Button>
          {imgUploaded && <p>Selected file: {profile_img.name}</p>}
        </div>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Stack>
    </div>
  );
}

export default SignUp;
