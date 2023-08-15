import {LoginSocialGoogle} from "reactjs-social-login";
import {GoogleLoginButton} from "react-social-login-buttons";
import {userInfo} from "./Login";
import {useNavigate} from "react-router-dom";
import {google_client_id} from "./settings";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useState} from "react";

function GoogleSignIn() {

    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const handleResolve = (resp) => {
        setClicked(true);
        console.log(resp.data)
        const userData = {
            email: resp.data.email,
            full_name: resp.data.name,
            role: "user",
            profile_img: resp.data.picture
        }
        const url = "/server_login_social"
        axios.post(url, userData, {withCredentials: true})
            .then((res) => {
                userInfo.set(res.data[0])
                setClicked(false)
                navigate('/')
            })
    }

    return (
        <div>
            {clicked ? <CircularProgress/> :
                <LoginSocialGoogle client_id={google_client_id}
                                   onReject={(err) => console.log(err)}
                                   onResolve={(resp) => handleResolve(resp)}>
                    <GoogleLoginButton/>
                </LoginSocialGoogle>
            }
        </div>
    );
}

export default GoogleSignIn;
