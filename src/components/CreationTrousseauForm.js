import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { config } from '../_config/static_keys';
import axios from 'axios';
import createToast from '../_config/toast_model';
import { create } from '@mui/material/styles/createTransitions';

const CreationTrousseauForm = () => {
  const [trousseauName, setTrousseauName] = useState('');
  const [members, setMembers] = useState([{ email: '', permissions: [] }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


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

  // const handleSubmit = () => {
  //   const trousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
  //   trousseaux.push({ name: trousseauName, members });
  //   localStorage.setItem('trousseaux', JSON.stringify(trousseaux));
  //   setTrousseauName('');
  //   setMembers([{ email: '', permissions: [] }]);
  // };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem(config.token);
      await axios.post(
        `${config.backend_url}/api/vaults`,
        { name: trousseauName },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      ).then(async (reponse) => {
        const vaultId = reponse.data._id;

        createToast("Trousseau créer avec succès", 0);

        await Promise.all(
          members.map(async (member) => {
            await axios.put(
              `${config.backend_url}/api/vaults/${vaultId}/addmember`,
              { memberId: member.email, permissions: member.permissions },
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }

            ).then((reponse) => {
              

              alert(JSON.stringify(reponse));

            })

              .catch((e) => {
                try {

                  alert(JSON.stringify(e));
                  // createToast("Une érreur est survenue lors de l'ajout des membres", 2);

                } catch (e) { }
              })

              .finally(() => {

                setLoading(false);
                setTrousseauName('');
                setMembers([{ email: '', permissions: [] }]);
              })
          })
        );
      })
        .catch((e) => {
          createToast("Une érreur est survenue lors de la création du trousseau", 2);
        });





      // Réinitialiser le formulaire

    } catch (err) {
      try {
        console.error('Erreur lors de la création du trousseau:', err);
        setError(err.response.data.message);
        createToast(err.response.data.message);
      } catch (e) {
        console.error('Erreur lors de la création du trousseau:', err);
        setError('Erreur lors de la création du trousseau');
        createToast('Erreur lors de la création du trousseau');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Créer un Trousseau
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
        disabled={loading}
      >
        {loading ? 'Chargement...' : 'Sauvegarder Trousseau'}
      </Button>
    </Box>
  );
};

export default CreationTrousseauForm;