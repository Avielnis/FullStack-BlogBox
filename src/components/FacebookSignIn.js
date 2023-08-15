import {LoginSocialFacebook} from "reactjs-social-login";
import {FacebookLoginButton} from "react-social-login-buttons";
import {userInfo} from "./Login";
import {useNavigate} from "react-router-dom";
import {facebook_appId} from "./settings";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useState} from "react";

function FacebookSignIn() {

    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)
    const handleResolve = (resp) => {
        setClicked(true)
        const userData = {
            email: resp.data.email,
            full_name: resp.data.name,
            role: "user",
            profile_img: resp.data.picture.data.url
        }
        const url = "/server_login_social"
        axios.post(url, userData, {withCredentials: true})
            .then((res) => {
                userInfo.set(res.data[0])
                console.log(userInfo.value)
                setClicked(false)
                navigate('/')
            })
    }

    return (
        <div>
            {clicked ? <CircularProgress/> :
                <LoginSocialFacebook appId={facebook_appId} onReject={(err) => console.log(err)}
                                     onResolve={(e) => handleResolve(e)}>
                    <FacebookLoginButton/>
                </LoginSocialFacebook>
            }
        </div>
    );
}

export default FacebookSignIn;