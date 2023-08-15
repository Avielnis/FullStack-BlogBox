import React, {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Link from "@mui/material/Link";
import {Stack} from "@mui/material";

function Login_or_signUp(props) {
    const [isSignUp, setIsSignUp] = useState(false)

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
    }
    return (
        <div>
            {!isSignUp ? (
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
                    >
                        <Login/>
                        Or
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleSignUp}
                        > SignUp</Link></Stack>
                )
                : (
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
                    >
                        <SignUp/>
                        Or
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleSignUp}
                        > Login</Link>
                    </Stack>
                )}
        </div>
    )

}

export default Login_or_signUp;