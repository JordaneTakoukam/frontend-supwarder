import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Paper, TextField, Button, IconButton } from '@mui/material'; // Importer IconButton
import { Delete } from '@mui/icons-material';

const TrousseauPage = () => {
  const { trousseauName } = useParams();
  const navigate = useNavigate();
  const [trousseau, setTrousseau] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredElements, setFilteredElements] = useState([]);

  useEffect(() => {
    const trousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
    const foundTrousseau = trousseaux.find(t => t.name === decodeURIComponent(trousseauName));
    setTrousseau(foundTrousseau || { members: [], elements: [] });
  }, [trousseauName]);

  useEffect(() => {
    if (trousseau) {
      setFilteredElements(
        trousseau.elements.filter(element =>
          element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          element.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          element.uri.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, trousseau]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveMember = (email) => {
    if (trousseau) {
      const newMembers = trousseau.members.filter(member => member.email !== email);
      const trousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
      const updatedTrousseau = { ...trousseau, members: newMembers };
      const index = trousseaux.findIndex(t => t.name === trousseauName);
      trousseaux[index] = updatedTrousseau;
      localStorage.setItem('trousseaux', JSON.stringify(trousseaux));
      setTrousseau(updatedTrousseau);
    }
  };

  const handleDeleteTrousseau = () => {
    const trousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
    const updatedTrousseaux = trousseaux.filter(t => t.name !== trousseauName);
    localStorage.setItem('trousseaux', JSON.stringify(updatedTrousseaux));
    navigate('/dashboard/trousseaux');
  };

  if (!trousseau) {
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {trousseauName}
      </Typography>
      <Button
        onClick={handleDeleteTrousseau}
        variant="contained"
        color="error"
        sx={{ mb: 3 }}
      >
        Supprimer Trousseau
      </Button>
      
      <TextField
        label="Rechercher un élément"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Membres
        </Typography>
        <List>
          {trousseau.members.length > 0 ? (
            trousseau.members.map((member, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={member.email}
                  secondary={`Permissions: ${member.permissions.join(', ')}`}
                />
                <IconButton onClick={() => handleRemoveMember(member.email)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography>Aucun membre trouvé.</Typography>
          )}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Éléments du Trousseau
        </Typography>
        <List>
          {filteredElements.length > 0 ? (
            filteredElements.map((element, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={element.name}
                  secondary={`Utilisateur: ${element.username} | URI: ${element.uri}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>Aucun élément trouvé.</Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default TrousseauPage;
