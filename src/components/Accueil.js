import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardHeader, IconButton, Divider } from '@mui/material';
import { Group, Key, Lock, ViewList, Person } from '@mui/icons-material';

// Simulated API calls (Replace these with actual API requests)
const fetchTrousseaux = async () => {
  // Simulate fetching data
  return [
    { id: 1, name: 'Trousseau 1', itemCount: 5 },
    { id: 2, name: 'Trousseau 2', itemCount: 3 },
  ];
};

const fetchGroups = async () => {
  // Simulate fetching data
  return [
    { id: 1, name: 'Groupe 1', memberCount: 10 },
    { id: 2, name: 'Groupe 2', memberCount: 8 },
  ];
};

const fetchImportantItems = async () => {
  // Simulate fetching data
  return [
    { id: 1, name: 'Important Item 1' },
    { id: 2, name: 'Important Item 2' },
  ];
};

const Accueil = () => {
  const [data, setData] = useState({
    trousseaux: [],
    groups: [],
    importantItems: [],
  });

  const [user, setUser] = useState({
    name: 'John Doe', // This should be dynamically set based on the logged-in user
    email: 'john.doe@example.com',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trousseauxData = await fetchTrousseaux();
        const groupsData = await fetchGroups();
        const importantItemsData = await fetchImportantItems();
        setData({
          trousseaux: trousseauxData,
          groups: groupsData,
          importantItems: importantItemsData,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5' }}>
      {/* User Info Section */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', p: 2, borderRadius: 2 }}>
        <Person sx={{ mr: 2, fontSize: 40, color: '#1976d2' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Bonjour, {user.name}
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
        Accueil
      </Typography>

      <Grid container spacing={3}>
        {/* Trousseaux Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333333' }}>
              <Key sx={{ verticalAlign: 'middle', mr: 1 }} /> Trousseaux
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {data.trousseaux.length ? (
              data.trousseaux.map(trousseau => (
                <Card key={trousseau.id} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CardHeader
                    title={trousseau.name}
                    action={
                      <IconButton aria-label="details" size="small">
                        <ViewList />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Nombre d'éléments : {trousseau.itemCount}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun trousseau trouvé.
              </Typography>
            )}
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
              Voir Tous les Trousseaux
            </Button>
          </Paper>
        </Grid>

        {/* Groupes Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333333' }}>
              <Group sx={{ verticalAlign: 'middle', mr: 1 }} /> Groupes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {data.groups.length ? (
              data.groups.map(group => (
                <Card key={group.id} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CardHeader
                    title={group.name}
                    action={
                      <IconButton aria-label="details" size="small">
                        <ViewList />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Nombre de membres : {group.memberCount}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun groupe trouvé.
              </Typography>
            )}
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
              Voir Tous les Groupes
            </Button>
          </Paper>
        </Grid>

        {/* Important Items Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333333' }}>
              <Lock sx={{ verticalAlign: 'middle', mr: 1 }} /> Éléments Importants
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {data.importantItems.length ? (
              data.importantItems.map(item => (
                <Card key={item.id} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun élément important trouvé.
              </Typography>
            )}
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
              Voir Tous les Éléments Importants
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Accueil;
