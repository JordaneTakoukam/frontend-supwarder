import React, { useState, useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledFooter = styled('footer')(({ isVisible }) => ({
  backgroundColor: '#1a237e',
  color: 'white',
  padding: '0.5rem 1rem',
  textAlign: 'center',
  borderTop: '1px solid #bbdefb',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}));

const SocialIcons = styled('div')({
  margin: '0.5rem 0',
});

const Icon = styled(IconButton)({
  color: 'white',
  margin: '0 0.3rem',
  padding: '0.5rem',
  '&:hover': {
    color: '#bbdefb',
  },
});

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setIsVisible(scrollPosition >= documentHeight); // Afficher le footer seulement à la fin de la page
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledFooter isVisible={isVisible}>
      <Typography variant="body2">
        © 2024 SUPWARDEN. Tous droits réservés.
      </Typography>
      <SocialIcons>
        <Icon>
          <FacebookIcon fontSize="small" />
        </Icon>
        <Icon>
          <TwitterIcon fontSize="small" />
        </Icon>
        <Icon>
          <LinkedInIcon fontSize="small" />
        </Icon>
      </SocialIcons>
    </StyledFooter>
  );
};

export default Footer;
