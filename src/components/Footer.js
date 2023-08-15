import React, { Component } from 'react';
import '../styles/Footer.css';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

class Footer extends Component {
    render() {
        return (
            <footer>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" id="Contact Me">
                    {/* Ben Shaya's Social Links */}
                    <Box border={1} borderRadius={8} padding={2} display="flex" flexDirection="column" alignItems="center" marginRight={3}>
                        <Box display="flex" justifyContent="center">
                            <IconButton
                                href="https://www.facebook.com/ben.shaya.5"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                href="https://il.linkedin.com/in/ben-shaya-939948202?trk=people-guest_people_search-card"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton
                                href="https://www.instagram.com/ben_shaya/"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body1">Ben Shaya</Typography>
                    </Box>

                    {/* Aviels Nisanov's Social Links */}
                    <Box border={1} borderRadius={8} padding={2} display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" justifyContent="center">
                            <IconButton
                                href="https://www.facebook.com/avielni"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                href="https://www.linkedin.com/in/aviel-nisanov-84b407203/"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton
                                href="https://www.instagram.com/avielnis/"
                                target="_blank"
                                rel="noreferrer"
                                color="primary"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body1">Aviels Nisanov</Typography>
                    </Box>
                </Box>
                <Typography align="center">
                    © Copyright Ben Shaya & Aviels Nisanov 2023. All Rights Reserved.
                </Typography>
            </footer>
        );
    }
}

export default Footer;
