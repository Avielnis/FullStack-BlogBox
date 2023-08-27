import React from 'react';
import { Container, Grid, Box } from "@mui/material";
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
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <ResponsiveAppBar />

            <Box flexGrow={1}>
                <Container maxWidth={false}>
                    <Grid container direction="column" style={{ minHeight: '100%' }}>
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
                                    <Route path='/Edit Password' element={<ChangePassword />} />
                                    <Route path='/Popular' element={<Popular />} />
                                </Routes>
                            </div>
                        </Grid>
                    </Grid>
                </Container>

                <div style={{height:'50px'}}></div>
            </Box>

            <Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default App;
