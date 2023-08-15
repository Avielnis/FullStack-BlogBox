import './styles/App.css';
import AboutMe from "./components/AboutMe";
import {Routes, Route} from "react-router-dom";
import Welcome from "./components/Welcome";
import NewPost from "./components/NewPost";
import ResponsiveAppBar from "./components/ResponsivAppBar";
import PostsCards from "./components/PostsCards";
import PostCardPage from "./components/PostCardPage";
import Login_or_signUp from "./components/Login_or_signUp";
import Profile from "./components/Profile"
import Logout from "./components/Logout";
import SignUp from "./components/SignUp";
import {loginWithSession, userInfo} from "./components/Login";
import EditPost from "./components/EditPost";
import ForgotPass from "./components/ForgotPass";
import ChangePassword from "./components/ChangePassword";

function App() {
    loginWithSession()

    return (<div className="App">

            <ResponsiveAppBar/>

            <div id="main">
                <Routes>
                    <Route path='/' Component={PostsCards}></Route>
                    <Route path='/welcome' Component={Welcome}></Route>
                    <Route path='/about' Component={AboutMe}></Route>
                    <Route path='/newPost' Component={NewPost}></Route>
                    <Route path='/posts/:id' Component={PostCardPage}></Route>
                    <Route exact path='/posts' Component={PostsCards}></Route>
                    <Route path='/login' Component={Login_or_signUp}></Route>
                    <Route path={'/profile'} Component={Profile}></Route>
                    <Route path={'/logout'} Component={Logout}></Route>
                    <Route path={'/signup'} Component={SignUp}></Route>
                    <Route path={'/editPost/:id'} Component={EditPost}></Route>
                    <Route path={'/forgotPass'} Component={ForgotPass}></Route>
                    <Route path={'/EditPassword'} Component={ChangePassword}></Route>
                </Routes>
            </div>
        </div>

    );
}

export default App;
