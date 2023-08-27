import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode"
import {google_client_id} from "./settings";
import axios from "axios";
import {userInfo} from "./Login";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

function GoogleSignIn_v1() {

    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false)


    useEffect(() => {
            /* global google */
            google.accounts.id.initialize({
                client_id: google_client_id,
                callback: handleCallBackResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size: "large"}
            );
        }
        , [])

    function handleCallBackResponse(resp) {
        setClicked(true)
        console.log(resp)
        const userObject = jwt_decode(resp.credential);
        console.log(userObject)
        const userData = {
            email: userObject.email,
            full_name: userObject.name,
            role: "user",
            profile_img: userObject.picture
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
            {clicked ? <CircularProgress/> : <div id="signInDiv"></div>}
        </div>
    );
}

export default GoogleSignIn_v1;
