import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ResponsiveAppBar from "./components/ResponsivAppBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import Welcome from "./components/Welcome";
import NewPost from "./components/NewPost";
import PostsCards from "./components/PostsCards";
import PostCardPage from "./components/PostCardPage";
import Login_or_signUp from "./components/Login_or_signUp";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import SignUp from "./components/SignUp";
import EditPost from "./components/EditPost";
import ForgotPass from "./components/ForgotPass";
import ChangePassword from "./components/ChangePassword";
import Popular from "./components/Popular";
import { loginWithSession } from "./components/Login";

function App() {
    loginWithSession();

    return (
        <div className="App">
            <ResponsiveAppBar />

            <Container maxWidth="lg">
                <Grid container direction="column" style={{ minHeight: '100vh' }}>
                    <Grid item xs={12} style={{ flex: 1 }}>
                        <div id="main">
                            <Routes>
                                <Route path='/' element={<PostsCards />} />
                                <Route path='/welcome' element={<Welcome />} />
                                <Route path='/about' element={<AboutMe />} />
                                <Route path='/newPost' element={<NewPost />} />
                                <Route path='/posts/:id' element={<PostCardPage />} />
                                <Route path='/posts' element={<PostsCards />} />
                                <Route path='/login' element={<Login_or_signUp />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/editPost/:id' element={<EditPost />} />
                                <Route path='/forgotPass' element={<ForgotPass />} />
                                <Route path='/EditPassword' element={<ChangePassword />} />
                                <Route path='/Popular' element={<Popular />} />
                            </Routes>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div id="footer">
                            <Footer />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
