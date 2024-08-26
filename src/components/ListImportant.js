import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../_config/static_keys';
import Loader from './_Loader';
import createToast from '../_config/toast_model';

import { Visibility, VisibilityOff, ContentCopy, } from '@mui/icons-material';


const ListImportant = () => {
  const token = localStorage.getItem(config.token);
  const [listPassword, setListPassword] = useState([]);
  const [loadinglistPassword, setLoadingTrousseau] = useState(false);
  const [loadingId, setLoadingId] = useState(null); // ID du trousseau en cours de suppression



  const fetchImportant = async () => {
    setLoadingTrousseau(true);
    try {
      const response = await axios.get(
        `${config.backend_url}/api/passwords`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setListPassword(response.data);
      setLoadingTrousseau(false);

    } catch (error) {
      console.error('Error fetching des mot de passe:', error);
      setLoadingTrousseau(false);

    }
  };

  useEffect(() => {
    fetchImportant();
  }, []);

  const handleDeletePassword = async (_id) => {
    setLoadingId(_id);
    try {
      await axios.delete(
        `${config.backend_url}/api/passwords/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Mise à jour de la liste après suppression
      setListPassword((prev) => prev.filter((trousseau) => trousseau._id !== _id));
      createToast('Mot de passe supprimé avec succès', 0);
    } catch (error) {
      console.error('Error deleting trousseau:', error);
      createToast('Erreur lors de la suppression du mot de passe', 2);
    } finally {
      setLoadingId(null);
    }
  };








  const [visiblePassword, setVisiblePassword] = useState({});

  const togglePasswordVisibility = (id) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    createToast("Copier avec succès", 0)
  };




  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste de mes mots de passe
      </Typography>
      <List>
        {
          loadinglistPassword ? (
            <Loader />
          ) : listPassword.length === 0 ? (
            <Typography>Aucun mot de passe ajouté.</Typography>
          ) : (
            listPassword.map((password, index) => (
              <ListItem key={index} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
                {/* Extrême gauche */}
                <Box flex="1" display="flex" alignItems="center">
                  <ListItemText primary={password.name} />
                </Box>

                {/* Centre */}
                <Box flex="2" display="flex" alignItems="center">
                  <ListItemText
                    primary={
                      visiblePassword[password._id]
                        ? password.password
                        : '**********' // 10 étoiles pour le mot de passe caché
                    }
                  />

                  {/* Icônes pour afficher/cacher et copier le mot de passe */}
                  <IconButton
                    sx={{ mr: 2 }} // Utilisation de `mr` pour margin-right
                    onClick={() => togglePasswordVisibility(password._id)} edge="end">
                    {visiblePassword[password._id] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(password.password);
                  }} edge="end">
                    <ContentCopy />
                  </IconButton>
                </Box>

                {/* Extrême droite */}
                <Box flex="1" display="flex" justifyContent="flex-end" alignItems="center">
                  {loadingId === password._id ? (
                    <div style={{ height: '20px', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Loader style={{ height: '100%', width: '100%' }} />
                    </div>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePassword(password._id);
                      }}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Supprimer
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))
          )
        }
      </List>



    </Box>
  );
};

export default ListImportant;
