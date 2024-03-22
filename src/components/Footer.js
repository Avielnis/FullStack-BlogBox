import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0', textAlign: 'center' }}>
            <Container>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box display="flex" alignItems="center" gap={0}>
                        <Typography variant="body1">Aviels Nisanov</Typography>
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
                    <Box>
                        <Typography variant="body1"> © 2023</Typography>
                    </Box>
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;