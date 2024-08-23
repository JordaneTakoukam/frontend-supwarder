import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import '../styles/Signup.css'; // Import des styles spécifiques à la page Signup
import { apiRegister } from '../api/auth/api.register';
import createToast from '../_config/toast_model';

// Styled components
const SignupContainer = styled('div')({
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

const SignupPaper = styled(Paper)({
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  textAlign: 'center',
});

const SignupButton = styled(Button)({
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

const Signup = () => {
  const navigate = useNavigate(); // Initialisez useNavigate

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('Adresse e-mail requise'),
      password: Yup.string()
        .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
        .required('Mot de passe requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('Confirmation du mot de passe requise'),
    }),
    onSubmit: async (values) => {


      setLoading(true);

      await apiRegister({ email: values.email, password: values.password })
        .then((result) => {
          if (result.success) {
            createToast(result.message, 0);
            navigate('/login');

          } else {
            createToast(result.message, 2)
          }

        })
        .catch((erreur) => {
          createToast("Une érreur est survenue", 2)
        })
        .finally(() => {
          setLoading(false);
        })

    },
  });

  return (
    <SignupContainer>
      <SignupPaper>
        <Typography variant="h4" component="h1">
          Inscription
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Adresse e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Confirmez le mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <SignupButton
            type="submit"
            variant="contained"
            fullWidth
          >
            {loading ? "Patientez..." : "S'inscrire"}
          </SignupButton>
        </form>
      </SignupPaper>
    </SignupContainer>
  );
};

export default Signup;
