import {extractErrorMessage, userInfo} from "./Login";
import {Alert, AlertTitle, LinearProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Logout() {
    const navigate = useNavigate()
    const [errorMasseg, setErrorMasseg] = useState('')

    const url = "/server_logout"
    const data = {}
    axios.post(url, data, {withCredentials: true})
        .then((resp) => {
            userInfo.set(null)
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }).catch((err) => {
        // setErrorMasseg(extractErrorMessage(err));
        setErrorMasseg("Something went wrong with the server");
    });


    return (
        <Stack
            sx={{width: '100%', color: 'grey.500'}} spacing={2}
        >

            <Typography
                level="body3"
                fontWeight="xl"
                textColor="common.white"
                sx={{mixBlendMode: 'difference'}}
            >
                {errorMasseg ? (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMasseg}
                    </Alert>
                ) : (
                    <div>
                        <LinearProgress color="success"/>
                        <Alert severity="success">
                            <AlertTitle>Redirecting</AlertTitle>
                            Loging out...
                        </Alert>
                    </div>
                )}
            </Typography>

        </Stack>
    )
}

export default Logout;