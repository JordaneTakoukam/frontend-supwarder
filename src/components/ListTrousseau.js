import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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


  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrousseau, setSelectedTrousseau] = useState(null);

  const handleItemClick = (trousseau) => {
    setSelectedTrousseau(trousseau);
    setDialogOpen(true); // Ouvrir la boîte de dialogue lors du clic
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Fermer la boîte de dialogue
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
                <ListItem key={index} style={{ cursor: 'pointer' }} onClick={() => handleItemClick(trousseau)}>
                  <ListItemText primary={trousseau.name} />
                  {loadingId === trousseau._id ? (
                    <div style={{ height: '20px', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Loader style={{ height: '100%', width: '100%' }} />
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
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            borderRadius: 15, // Arrondir les coins
            padding: '20px',  // Ajouter un padding pour plus d'espace intérieur
            maxWidth: '600px', // Augmenter la largeur maximale
            width: '100%', // S'assurer que la boîte de dialogue occupe tout l'espace disponible
          },
        }}
      >
        <DialogTitle style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
          Détails du Trousseau {selectedTrousseau?.name}
        </DialogTitle>
        <DialogContent>
          {selectedTrousseau?.sharedWith.map((sharedUser, idx) => (
            <div
              key={sharedUser._id}
              style={{
                fontSize: '1.2em',
                marginBottom: '15px',
                padding: '10px ',
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
              }}
            >
              {idx + 1} -     <strong> {idx === 0 ? `Moi (${sharedUser.email}) ` : sharedUser.email + " "}</strong> :
              {sharedUser.permissions === 'read' ? ' Lecture' : sharedUser.permissions === 'write' ? ' Écriture' : ' Administrateur'}
            </div>
          ))}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'end' }}>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="contained"
            style={{ borderRadius: '10px', padding: '5px 30px', margin: "0px 15px" }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default TrousseauList;
