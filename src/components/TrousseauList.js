import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TrousseauList = () => {
  const [trousseaux, setTrousseaux] = useState([]);

  useEffect(() => {
    const storedTrousseaux = JSON.parse(localStorage.getItem('trousseaux')) || [];
    setTrousseaux(storedTrousseaux);
  }, []);

  const handleDeleteTrousseau = (name) => {
    const updatedTrousseaux = trousseaux.filter(t => t.name !== name);
    localStorage.setItem('trousseaux', JSON.stringify(updatedTrousseaux));
    setTrousseaux(updatedTrousseaux);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Trousseaux
      </Typography>
      <List>
        {trousseaux.length > 0 ? (
          trousseaux.map((trousseau, index) => (
            <ListItem key={index} component={Link} to={`/dashboard/trousseaux/${trousseau.name}`}>
              <ListItemText primary={trousseau.name} />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTrousseau(trousseau.name);
                }}
                variant="contained"
                color="error"
                size="small"
              >
                Supprimer
              </Button>
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
