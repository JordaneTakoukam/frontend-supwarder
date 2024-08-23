import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Switch, FormControlLabel } from '@mui/material';
import { Google, Microsoft, GitHub } from '@mui/icons-material';

const Parametres = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [usePinCode, setUsePinCode] = useState(false);

  const handlePasswordChange = () => {
    console.log('Mot de passe changé');
  };

  const handlePinCodeChange = () => {
    console.log('Code PIN défini ou changé');
  };

  const handleOAuthLink = (provider) => {
    console.log(`Compte ${provider} lié`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestion des paramètres utilisateur
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Changer le mot de passe</Typography>
        <TextField
          label="Mot de passe actuel"
          type="password"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Nouveau mot de passe"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handlePasswordChange}>
          Changer le mot de passe
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Authentification OAuth2</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => handleOAuthLink('Google')}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Google sx={{ mr: 1 }} /> Lier Google
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleOAuthLink('Microsoft')}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Microsoft sx={{ mr: 1 }} /> Lier Microsoft
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleOAuthLink('Github')}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <GitHub sx={{ mr: 1 }} /> Lier GitHub
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="h6">Définir un code PIN</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={usePinCode}
              onChange={(e) => setUsePinCode(e.target.checked)}
            />
          }
          label="Utiliser un code PIN pour l'accès aux éléments sensibles"
          sx={{ mb: 2 }}
        />
        {usePinCode && (
          <>
            <TextField
              label="Code PIN"
              type="password"
              fullWidth
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handlePinCodeChange}>
              Définir le code PIN
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Parametres;
