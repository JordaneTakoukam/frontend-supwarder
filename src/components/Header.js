import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#003366', // Couleur de fond bleu foncé
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Ombre plus prononcée
  borderBottom: '2px solid #00509e', // Bordure inférieure pour une touche supplémentaire
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between', // Espacement entre le titre et les boutons
  alignItems: 'center', // Alignement vertical des éléments
  padding: '0 20px', // Padding pour un espacement confortable
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold', // Poids de la police pour le titre
  fontSize: '1.5rem', // Taille de la police pour le titre
  color: '#ffffff', // Couleur du texte
});

const StyledButton = styled(Button)({
  color: '#ffffff', // Couleur du texte
  fontWeight: '500', // Poids de la police pour les boutons
  marginLeft: '15px', // Espacement entre les boutons
  padding: '8px 16px', // Padding pour des boutons plus grands
  borderRadius: '4px', // Coins arrondis pour les boutons
  '&:hover': {
    backgroundColor: '#002244', // Couleur au survol pour les boutons
    opacity: 0.8,
  },
});

const IconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledTypography variant="h6" component="div">
          SUPWARDEN
        </StyledTypography>
        <IconWrapper>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <StyledButton color="inherit" component={Link} to="/">Accueil</StyledButton>
          <StyledButton color="inherit" component={Link} to="/login">Connexion</StyledButton>
        </IconWrapper>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
