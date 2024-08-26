import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AttachFile from '@mui/icons-material/AttachFile';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/CreationElementForm.css'; // Mise à jour du chemin
import { config } from '../_config/static_keys';

const CreationElementForm = () => {

  const token = localStorage.getItem(config.token);


  const [formData, setFormData] = useState({
    nom: '',
    identifiant: '',
    motDePasse: '',
    motDePasseVisible: false,
    uris: [''],
    note: '',
    champsPersonnalises: [{ type: 'visible', label: '', value: '' }],
    fichier: null,
    partage: false,
    sensible: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMotDePasseVisibility = () => {
    setFormData(prevState => ({
      ...prevState,
      motDePasseVisible: !prevState.motDePasseVisible
    }));
  };

  const handleAddUri = () => {
    setFormData(prevState => ({
      ...prevState,
      uris: [...prevState.uris, '']
    }));
  };

  const handleRemoveUri = (index) => {
    setFormData(prevState => ({
      ...prevState,
      uris: prevState.uris.filter((_, i) => i !== index)
    }));
  };

  const handleUriChange = (index, value) => {
    const newUris = [...formData.uris];
    newUris[index] = value;
    setFormData(prevState => ({
      ...prevState,
      uris: newUris
    }));
  };

  const handleAddChampPersonnalise = () => {
    setFormData(prevState => ({
      ...prevState,
      champsPersonnalises: [...prevState.champsPersonnalises, { type: 'visible', label: '', value: '' }]
    }));
  };

  const handleRemoveChampPersonnalise = (index) => {
    setFormData(prevState => ({
      ...prevState,
      champsPersonnalises: prevState.champsPersonnalises.filter((_, i) => i !== index)
    }));
  };

  const handleChampPersonnaliseChange = (index, field, value) => {
    const newChamps = [...formData.champsPersonnalises];
    newChamps[index] = { ...newChamps[index], [field]: value };
    setFormData(prevState => ({
      ...prevState,
      champsPersonnalises: newChamps
    }));
  };

  const handleFileChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      fichier: event.target.files[0]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Traitement des données du formulaire
    console.log('Données du formulaire:', formData);
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" className="form-title">
        Création d'un élément
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom de l'élément"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="text-field"
        />
        <TextField
          label="Identifiant de connexion"
          name="identifiant"
          value={formData.identifiant}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="text-field"
        />
        <TextField
          label="Mot de passe"
          name="motDePasse"
          type={formData.motDePasseVisible ? 'text' : 'password'}
          value={formData.motDePasse}
          onChange={handleChange}
          fullWidth
          margin="normal"
          className="text-field"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleMotDePasseVisibility}
                >
                  {formData.motDePasseVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button className="button-generate" variant="outlined" onClick={() => alert('Générer un mot de passe')}>
          Générer un mot de passe
        </Button>

        <Typography variant="h6" className="custom-fields-title">URI associée</Typography>
        {formData.uris.map((uri, index) => (
          <Box key={index} className="uri-field-container">
            <TextField
              label={`URI ${index + 1}`}
              value={uri}
              onChange={(e) => handleUriChange(index, e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
            />
            <IconButton onClick={() => handleRemoveUri(index)} color="error">
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button className="button-add" variant="outlined" onClick={handleAddUri} startIcon={<AddIcon />}>
          Ajouter URI
        </Button>

        <TextField
          label="Note textuelle"
          name="note"
          value={formData.note}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          className="text-field"
        />

        <Typography variant="h6" className="custom-fields-title">Champs personnalisables</Typography>
        <Box className="custom-fields-container">
          {formData.champsPersonnalises.map((champ, index) => (
            <Box key={index} className="custom-field">
              <FormControl fullWidth margin="normal">
                <InputLabel>Type de champ</InputLabel>
                <Select
                  value={champ.type}
                  onChange={(e) => handleChampPersonnaliseChange(index, 'type', e.target.value)}
                  name="type"
                >
                  <MenuItem value="visible">Visible</MenuItem>
                  <MenuItem value="masque">Masqué</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Label"
                value={champ.label}
                onChange={(e) => handleChampPersonnaliseChange(index, 'label', e.target.value)}
                fullWidth
                margin="normal"
                className="text-field"
              />
              <TextField
                label="Valeur"
                value={champ.value}
                onChange={(e) => handleChampPersonnaliseChange(index, 'value', e.target.value)}
                fullWidth
                margin="normal"
                className="text-field"
              />
              <IconButton onClick={() => handleRemoveChampPersonnalise(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
          <Button className="button-add" variant="outlined" onClick={handleAddChampPersonnalise} startIcon={<AddIcon />}>
            Ajouter champ personnalisé
          </Button>
        </Box>

        <Box className="checkbox-group">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={formData.partage} onChange={handleChange} name="partage" />}
              label="Partage avec le groupe"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.sensible} onChange={handleChange} name="sensible" />}
              label="Élément sensible (mot de passe requis)"
            />
          </FormGroup>
        </Box>

        <Box className="file-input-container">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            id="file-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input">
            <Button className="button-attach" variant="outlined" component="span" startIcon={<AttachFile />}>
              Joindre un fichier
            </Button>
          </label>
          {formData.fichier && (
            <Typography className="file-info">
              Fichier joint: {formData.fichier.name}
            </Typography>
          )}
        </Box>

        <Button type="submit" className="submit-button" variant="contained">
          Soumettre
        </Button>
      </form>
    </Box>
  );
};

export default CreationElementForm;
