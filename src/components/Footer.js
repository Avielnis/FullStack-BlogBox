import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <AppBar position="fixed" color="default" sx={{
            backgroundColor: '#e0e0e0',
            padding: '5px 0',
            marginTop: '10px',
            fontFamily: "'Roboto Condensed', sans-serif",
            bottom: 0,
            width: '100%',
            flexGrow: 0,
            top: 'auto'
        }}>
            <Toolbar>
                <Grid container spacing={3} alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="center">
                            <Box display="flex" justifyContent="center" gap={2}>
                                <IconButton href="https://www.facebook.com/ben.shaya.5" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton href="https://il.linkedin.com/in/ben-shaya-939948202?trk=people-guest_people_search-card" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton href="https://www.instagram.com/ben_shaya/" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <InstagramIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body1">Ben Shaya</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <Typography align="center" variant="body2">
                            © Copyright Ben Shaya & Aviels Nisanov 2023. All Rights Reserved.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box textAlign="center">
                            <Box display="flex" justifyContent="center" gap={2}>
                                <IconButton href="https://www.facebook.com/avielni" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton href="https://www.linkedin.com/in/aviel-nisanov-84b407203/" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton href="https://www.instagram.com/avielnis/" target="_blank" rel="noreferrer" sx={{ '&:hover': { color: '#1a237e' } }}>
                                    <InstagramIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body1">Aviels Nisanov</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
