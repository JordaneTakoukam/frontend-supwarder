import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const CreationTrousseauForm = () => {
  const [trousseauName, setTrousseauName] = useState('');
  const [members, setMembers] = useState([{ email: '', permissions: [] }]);

  const handleAddMember = () => {
    setMembers([...members, { email: '', permissions: [] }]);
  };

  const handleChangeMemberEmail = (index, event) => {
    const newMembers = [...members];
    newMembers[index].email = event.target.value;
    setMembers(newMembers);
  };

  const handleAddPermission = (index, permission) => {
    const newMembers = [...members];
    if (!newMembers[index].permissions.includes(permission)) {
      newMembers[index].permissions.push(permission);
      setMembers(newMembers);
    }
  };

  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = () => {
    const trousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
    trousseaux.push({ name: trousseauName, members });
    localStorage.setItem('trousseaux', JSON.stringify(trousseaux));
    setTrousseauName('');
    setMembers([{ email: '', permissions: [] }]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Créer un Trousseau
      </Typography>
      <TextField
        label="Nom du Trousseau"
        value={trousseauName}
        onChange={(e) => setTrousseauName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" gutterBottom>
        Membres
      </Typography>
      {members.map((member, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <TextField
            label="Email du Membre"
            value={member.email}
            onChange={(e) => handleChangeMemberEmail(index, e)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={() => handleAddPermission(index, 'Lecture')}
            sx={{ mr: 1 }}
            variant="contained"
            color="secondary"
          >
            Ajouter Permission Lecture
          </Button>
          <Button
            onClick={() => handleAddPermission(index, 'Modification')}
            sx={{ mr: 1 }}
            variant="contained"
            color="secondary"
          >
            Ajouter Permission Modification
          </Button>
          <Button
            onClick={() => handleAddPermission(index, 'Suppression')}
            variant="contained"
            color="secondary"
          >
            Ajouter Permission Suppression
          </Button>
          <IconButton onClick={() => handleRemoveMember(index)} sx={{ ml: 2 }}>
            <Delete />
          </IconButton>
        </Paper>
      ))}
      <Button
        onClick={handleAddMember}
        variant="contained"
        color="primary"
        startIcon={<Add />}
        sx={{ mb: 3 }}
      >
        Ajouter Membre
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
      >
        Sauvegarder Trousseau
      </Button>
    </Box>
  );
};

export default CreationTrousseauForm;
