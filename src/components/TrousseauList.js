import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../_config/static_keys';
import Loader from './_Loader';
import createToast from '../_config/toast_model';

const TrousseauList = () => {
  const token = localStorage.getItem(config.token);
  const [trousseaux, setTrousseaux] = useState([]);
  const [loadingTrousseaux, setLoadingTrousseau] = useState(false);
  const [loadingId, setLoadingId] = useState(null); // ID du trousseau en cours de suppression

  const fetchTrousseaux = async () => {
    setLoadingTrousseau(true);
    try {
      const response = await axios.get(
        `${config.backend_url}/api/vaults`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTrousseaux(response.data);
      setLoadingTrousseau(false);

    } catch (error) {
      console.error('Error fetching trousseaux:', error);
      setLoadingTrousseau(false);

    }
  };

  useEffect(() => {
    fetchTrousseaux();
  }, []);

  const handleDeleteTrousseau = async (_id) => {
    setLoadingId(_id);
    try {
      await axios.delete(
        `${config.backend_url}/api/vaults/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Mise à jour de la liste après suppression
      setTrousseaux((prev) => prev.filter((trousseau) => trousseau._id !== _id));
      createToast('Trousseau supprimé avec succès', 0);
    } catch (error) {
      console.error('Error deleting trousseau:', error);
      createToast('Erreur lors de la suppression du trousseau', 2);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Trousseaux
      </Typography>
      <List>
        {
          loadingTrousseaux ?
            <Loader /> :
            trousseaux.length > 0 ? (
              trousseaux.map((trousseau, index) => (
                <ListItem key={index}>
                  <ListItemText primary={trousseau.name} />
                  {loadingId === trousseau._id ? (
                    <div style={{ height: "20px", width: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Loader style={{ height: "100%", width: "100%" }} />
                    </div>

                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrousseau(trousseau._id);
                      }}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Supprimer
                    </Button>
                  )}
                </ListItem>
              ))
            ) : (
              <Typography>Aucun trousseau trouvé.</Typography>
            )}
      </List>
    </Box>
  );
};

export default TrousseauList;
