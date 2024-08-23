import React, { useState } from 'react';
import { Box, TextField, Button, FormControlLabel, Checkbox, Typography, Slider, Card, CardContent, CardHeader, Grid, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PasswordIcon from '@mui/icons-material/Password';
import NumbersIcon from '@mui/icons-material/Numbers';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [minUppercase, setMinUppercase] = useState(1);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [minLowercase, setMinLowercase] = useState(1);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [minNumbers, setMinNumbers] = useState(1);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [minSpecialChars, setMinSpecialChars] = useState(1);
  const [avoidAmbiguousChars, setAvoidAmbiguousChars] = useState(false);

  const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    const ambiguousChars = 'IlO0S5';

    let charPool = '';
    let generatedPassword = '';

    if (includeUppercase) charPool += upperCaseChars.replace(avoidAmbiguousChars ? /[Il]/g : '', '');
    if (includeLowercase) charPool += lowerCaseChars.replace(avoidAmbiguousChars ? /[l]/g : '', '');
    if (includeNumbers) charPool += numberChars.replace(avoidAmbiguousChars ? /[O0]/g : '', '');
    if (includeSpecialChars) charPool += specialChars.replace(avoidAmbiguousChars ? /[{}]/g : '', '');

    // Function to shuffle characters in a string
    const shuffle = (string) => string.split('').sort(() => 0.5 - Math.random()).join('');

    // Add minimum required characters first
    if (includeUppercase) generatedPassword += shuffle(upperCaseChars).slice(0, minUppercase);
    if (includeLowercase) generatedPassword += shuffle(lowerCaseChars).slice(0, minLowercase);
    if (includeNumbers) generatedPassword += shuffle(numberChars).slice(0, minNumbers);
    if (includeSpecialChars) generatedPassword += shuffle(specialChars).slice(0, minSpecialChars);

    // Fill the rest of the password
    while (generatedPassword.length < length) {
      generatedPassword += charPool[Math.floor(Math.random() * charPool.length)];
    }

    // Shuffle the final password to ensure randomness
    setPassword(shuffle(generatedPassword.slice(0, length)));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <Box className="password-generator-container" sx={{ p: 4, maxWidth: 800, margin: 'auto', backgroundColor: '#f4f6f8', borderRadius: 2 }}>
      <Typography variant="h3" gutterBottom className="password-generator-header" sx={{ mb: 3, textAlign: 'center' }}>
        <EmojiEventsIcon sx={{ fontSize: 40, mr: 1 }} />
        Générateur de Mot de Passe
      </Typography>

      <Paper elevation={5} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Longueur du mot de passe : {length}
        </Typography>
        <Slider
          value={length}
          onChange={(e, value) => setLength(value)}
          aria-labelledby="slider-longueur"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={8}
          max={128}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title="Majuscules"
                avatar={<PasswordIcon />}
              />
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                    />
                  }
                  label="Inclure"
                />
                {includeUppercase && (
                  <Slider
                    value={minUppercase}
                    onChange={(e, value) => setMinUppercase(value)}
                    aria-labelledby="slider-majuscule"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={length}
                    sx={{ mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title="Minuscules"
                avatar={<TextFieldsIcon />}
              />
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                    />
                  }
                  label="Inclure"
                />
                {includeLowercase && (
                  <Slider
                    value={minLowercase}
                    onChange={(e, value) => setMinLowercase(value)}
                    aria-labelledby="slider-minuscule"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={length}
                    sx={{ mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title="Chiffres"
                avatar={<NumbersIcon />}
              />
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                    />
                  }
                  label="Inclure"
                />
                {includeNumbers && (
                  <Slider
                    value={minNumbers}
                    onChange={(e, value) => setMinNumbers(value)}
                    aria-labelledby="slider-nombres"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={length}
                    sx={{ mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title="Caractères spéciaux"
                avatar={<PasswordIcon />}
              />
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeSpecialChars}
                      onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                    />
                  }
                  label="Inclure"
                />
                {includeSpecialChars && (
                  <Slider
                    value={minSpecialChars}
                    onChange={(e, value) => setMinSpecialChars(value)}
                    aria-labelledby="slider-caracteres-speciaux"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={length}
                    sx={{ mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={avoidAmbiguousChars}
                  onChange={(e) => setAvoidAmbiguousChars(e.target.checked)}
                />
              }
              label="Éviter les caractères ambigus (I, L, O, 0, S, 5)"
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={generatePassword}
          sx={{ mt: 3, mb: 3, fontSize: '1.2rem' }}
        >
          Générer un mot de passe
        </Button>

        {password && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Mot de passe généré :
            </Typography>
            <TextField
              value={password}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 3, fontSize: '1.2rem' }}
            />
            <IconButton
              color="secondary"
              onClick={copyToClipboard}
              aria-label="Copier dans le presse-papier"
              sx={{ fontSize: '1.5rem' }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PasswordGenerator;
