import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, InputAdornment, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Email as EmailIcon, Lock as LockIcon, Google as GoogleIcon, GitHub as GitHubIcon, Microsoft as MicrosoftIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { apiLogin } from '../api/auth/api.login';
import createToast from '../_config/toast_model';

const LoginContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  background: `url('/assets/images/back.jpg') no-repeat center center fixed`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '0 1rem',
});

const LoginPaper = styled(Paper)({
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  textAlign: 'center',
  position: 'relative',
});

const LoginButton = styled(Button)({
  marginTop: '1.5rem',
  backgroundColor: '#1976d2',
  color: '#fff',
  fontWeight: '600',
  borderRadius: '8px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#125a9e',
  },
});

const SocialButton = styled(Button)({
  marginTop: '1rem',
  backgroundColor: '#ffffff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  color: '#333',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f1f1f1',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  },
});

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleLogin = async () => {
    // Vérification de l'email et du mot de passe
    if (!email) {
      createToast("L'adresse e-mail est requise", 1);
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      createToast("Adresse e-mail invalide", 1);
      return;
    }
    if (password.length < 6) {
      createToast("Le mot de passe doit comporter au moins 6 caractères", 1);
      return;
    }

    // Déclencher la logique de connexion
    setLoading(true);

    await apiLogin({ email: email, password: password })
      .then((result) => {
        if (result.success) {
          createToast(result.message, 0);

          setTimeout(() => {
            navigate('/dashboard');
          }, 500);
        } else {
          createToast(result.message, 2)
        }

        // if (result.success) {
        //   createToast(result.message, 0);
        //   navigate('/login');
        // } else {
        //   createToast(result.message, 2)
        // }
      })
      .catch((erreur) => {
        createToast(erreur.message, 2)
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const handleSignup = () => {
    navigate('/signup'); // Navigation vers la page d'inscription
  };

  return (
    <LoginContainer>
      <LoginPaper>
        <Typography variant="h4" component="h1">
          Connexion
        </Typography>
        <TextField
          label="Adresse e-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <LoginButton
          variant="contained"
          fullWidth
          onClick={handleLogin}
        >
          {loading ? "Patientez..." : "Se connecter"}

        </LoginButton>
        <SocialButton
          variant="outlined"
          fullWidth
        >
          <GoogleIcon />
          Connexion avec Google
        </SocialButton>
        <SocialButton
          variant="outlined"
          fullWidth
        >
          <GitHubIcon />
          Connexion avec GitHub
        </SocialButton>
        <SocialButton
          variant="outlined"
          fullWidth
        >
          <MicrosoftIcon />
          Connexion avec Microsoft
        </SocialButton>
        <Link href="#" className="forgotPassword" sx={{ display: 'block', marginTop: '1rem' }}>
          Mot de passe oublié ?
        </Link>
        <Button
          variant="text"
          fullWidth
          onClick={handleSignup}
          sx={{ mt: 2, color: '#1976d2' }}
        >
          Pas encore de compte ? S'inscrire
        </Button>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
