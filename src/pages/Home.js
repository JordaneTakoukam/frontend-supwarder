import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection
import '../styles/Home.css'; // Import des styles spécifiques à la page Home

const Root = styled('div')({
  flexGrow: 1,
  padding: '24px',
});

const HeroContent = styled('div')({
  padding: '64px 0',
  textAlign: 'center',
  background: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY0NjUyOTY1MA&ixlib=rb-1.2.1&q=80&w=1080') no-repeat center center`,
  backgroundSize: 'cover',
  color: '#fff',
  minHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textShadow: '0px 0px 10px rgba(0,0,0,0.7)',
});

const Features = styled(Container)({
  padding: '64px 0',
});

const FeatureItem = styled(Paper)({
  padding: '24px',
  textAlign: 'center',
});

const FeatureIcon = styled(Typography)({
  fontSize: '4rem',
  marginBottom: '8px',
});

const CustomButton = styled(Button)({
  marginTop: '24px',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#125a9e',
  },
});

const Home = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  const handleStartClick = () => {
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <Root>
      <HeroContent className="heroContent">
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenue sur SUPWARDEN
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Gérez vos mots de passe en toute sécurité et efficacité.
        </Typography>
        <CustomButton variant="contained" onClick={handleStartClick}>
          Commencer
        </CustomButton>
      </HeroContent>
      <Features className="features">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureItem>
              <FeatureIcon>🔒</FeatureIcon>
              <Typography variant="h6" gutterBottom>
                Sécurisé
              </Typography>
              <Typography variant="body1">
                Tous vos mots de passe sont chiffrés et stockés en toute sécurité.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem>
              <FeatureIcon>🤝</FeatureIcon>
              <Typography variant="h6" gutterBottom>
                Collaboratif
              </Typography>
              <Typography variant="body1">
                Partagez vos mots de passe en toute sécurité avec votre équipe.
              </Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureItem>
              <FeatureIcon>⚙️</FeatureIcon>
              <Typography variant="h6" gutterBottom>
                Facile à utiliser
              </Typography>
              <Typography variant="body1">
                Interface conviviale pour une gestion facile.
              </Typography>
            </FeatureItem>
          </Grid>
        </Grid>
      </Features>
    </Root>
  );
};

export default Home;
