import React, { useState } from 'react';
import { Box, Button, Typography, MenuItem, Select, InputLabel, FormControl, TextField, Paper, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { config } from '../_config/static_keys';
import axios from 'axios';
import createToast from '../_config/toast_model';
import { create } from '@mui/material/styles/createTransitions';
import Loader from './_Loader';

const CreationTrousseauForm = () => {

  const [trousseauName, setTrousseauName] = useState('');

  const listPermissionDisponible = ["read", "write", "admin"];


  const [members, setMembers] = useState([{ email: '', permission: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleAddMember = () => {
    setMembers([...members, { email: '', permission: '' }]);
  };

  const handleChangeMemberEmail = (index, event) => {
    const newMembers = [...members];
    newMembers[index].email = event.target.value;
    setMembers(newMembers);
  };

  const handlePermissionChange = (event, index) => {
    const permission = event.target.value;
    setMembers((prevMembers) => {
      const newMembers = [...prevMembers];
      newMembers[index].permission = permission;
      return newMembers;
    });
  };



  const handleRemoveMember = (index) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };



  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const token = localStorage.getItem(config.token);

  const handleSubmit = async () => {
    let hasError = false;

    if (!trousseauName) {
      createToast(`Veuillez indiquer le nom du trousseau`, 1);
      return;

    }


    members.forEach((member, index) => {
      if (!isValidEmail(member.email)) {
        createToast(`Adresse email invalide pour le membre ${index + 1}`, 1);
        hasError = true;
        return;
      }

      if (!member.permission) {
        createToast(`Veuillez sélectionner une permission pour le membre ${index + 1}`, 1);
        hasError = true;
      }
    });

    if (!hasError) {
      setLoading(true);
      setError('');

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

        if (members.length > 0) {
          setLoading(true);

          // Collecter les erreurs
          let errors = [];
          let successResponses = [];

          // Traitement des membres
          await Promise.all(
            members.map(async (member, index) => {
              try {
                const response = await axios.put(
                  `${config.backend_url}/api/vaults/${vaultId}/addmember`,
                  { memberId: member.email, permission: member.permission },
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                  }
                );
                successResponses.push({ index, response });
              } catch (e) {

                try {
                  createToast(`${e.response.data.message}. Le membre ${index + 1} n'a pas été ajouter`, 2);

                } catch (e) {
                  createToast(`Le membre ${index + 1} n'a pas été ajouter`, 2);
                }
              }
            })
          );



          setMembers([{ email: '', permission: '' }]);
          createToast(`Trousseau créé avec succès avec ${successResponses.length} membre(s)`, 0);
          setLoading(false);

        } else {
          setTrousseauName('');
          setMembers([{ email: '', permission: '' }]);
          createToast("Trousseau privé créé avec succès", 0);
        }
      })
        .catch((e) => {
          try {
            createToast(`${e.response.data.message}, membre  non ajouter`, 2);

          } catch (e) {

            createToast("Une érreur est survenue lors de la création du trousseau", 2);
          }

        }).finally(() => {
          setTrousseauName('');
          setLoading(false);

        })


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
          <Typography variant="h6" gutterBottom>
            Membre {index + 1}
          </Typography>
          <TextField
            label="Email du Membre"
            value={member.email}
            onChange={(e) => handleChangeMemberEmail(index, e)}
            fullWidth
            margin="normal"
          />
          {/* <Button
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
          </Button> */}

          <Typography sx={{ mt: 1 }} variant="h6">Ajouter une permission {member.email && `pour ${member.email}`}</Typography>

          <FormControl fullWidth sx={{ mt: 1 }}>
            <Select
              labelId="permission-select-label"
              value={members[index].permission}
              onChange={(event) => handlePermissionChange(event, index)} // Passe l'index à la fonction
              displayEmpty
            >
              <MenuItem value="" disabled>Sélectionner une permission</MenuItem>
              {listPermissionDisponible.map((permission) => (
                <MenuItem key={permission} value={permission}>
                  {permission === 'read' ? 'Lecture' : permission === 'write' ? 'Ecriture' : 'Administrateur'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          {
            <IconButton onClick={() => handleRemoveMember(index)} sx={{ ml: 2 }}>
              <Delete />
            </IconButton>
          }
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
        {loading ? <Loader /> : 'Sauvegarder Trousseau'}
      </Button>
    </Box>
  );
};

export default CreationTrousseauForm;