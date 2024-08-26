import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Card, CardContent, CardHeader, IconButton, Divider } from '@mui/material';
import { Group, Key, Lock, ViewList, Person } from '@mui/icons-material';
import { config } from "./../_config/static_keys";
import { decodeToken } from "./../middleware/middleware"
import axios from 'axios';
import Loader from './_Loader';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';



const Accueil = () => {
  const navigate = useNavigate();

  const [loadingTrousseau, setLoadingTrousseau] = useState(false);
  const [loadingGroupe, setLoadingGroupe] = useState(false);
  const [loadingImportant, setLoadingImportant] = useState(false);

  const token = localStorage.getItem(config.token);
  const dataToken = decodeToken(token);

  const userId = dataToken.value.id;
  const userEmail = dataToken.value.email;



  // Fetch trousseaux data
  const fetchTrousseaux = async () => {
    setLoadingTrousseau(true);
    try {
      const response = await axios.get(
        `${config.backend_url}/api/vaults`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(prevData => ({ ...prevData, trousseaux: response.data }));
    } catch (error) {
      console.error('Error fetching trousseaux:', error);
    } finally {
      setLoadingTrousseau(false);
    }
  };

  // Fetch groups data
  const fetchGroups = async () => {
    setLoadingGroupe(true);
    try {
      // const groups = [
      //   { id: 1, name: 'Groupe 1', memberCount: 10 },
      //   { id: 2, name: 'Groupe 2', memberCount: 8 },
      // ];
      // setData(prevData => ({ ...prevData, groups }));
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoadingGroupe(false);
    }
  };

  // Fetch important items data
  const fetchImportantItems = async () => {
    setLoadingImportant(true);
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
      setData(prevData => ({ ...prevData, importantItems: response.data }));

      setLoadingImportant(false);

    } catch (error) {
      console.error('Error fetching des mot de passe:', error);
      setLoadingImportant(false);

    }
  };



  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchTrousseaux();
    fetchGroups();
    fetchImportantItems();
  }, []);








  const [data, setData] = useState({
    trousseaux: [],
    groups: [],
    importantItems: [],
  });

  const [user, setUser] = useState({
    name: userEmail,
  });


  const [passwordVisibility, setPasswordVisibility] = useState({});

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = (id) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const trousseauxData = await fetchTrousseaux();
  //       const groupsData = await fetchGroups();
  //       const importantItemsData = await fetchImportantItems();
  //       setData({
  //         trousseaux: trousseauxData,
  //         groups: groupsData,
  //         importantItems: importantItemsData,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // Handle error appropriately
  //     }
  //   };

  //   fetchData();
  // }, []);

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
            {
              loadingTrousseau ?
                <Loader />
                :
                data.trousseaux.length > 0 ? (
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
                          Nombre d'éléments : {trousseau?.sharedWith.length || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Aucun trousseau trouvé.
                  </Typography>
                )}
            <Button
              onClick={() => { navigate('/dashboard/list-trousseaux') }}
              variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
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
            {
              loadingGroupe ?
                <Loader />
                :
                data.groups.length > 0 ? (
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
            <Button
              onClick={() => { navigate('/dashboard/list-groupes') }}

              variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
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
            {
              loadingImportant ?
                <Loader /> :

                data.importantItems.length ? (
                  data.importantItems.map(item => (
                    <Card key={item._id} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                          {item.name}.
                          <IconButton
                            sx={{ mr: 2, cursor: 'pointer' }}
                            edge="end"
                            onClick={() => togglePasswordVisibility(item._id)} // Passer l'id pour gérer chaque mot de passe
                          >
                            <Box
                              sx={{ ml: 2, cursor: 'pointer' }}
                            >                            {passwordVisibility[item._id] ? <VisibilityOff /> : <Visibility />}
                            </Box>                          </IconButton>
                          <Typography
                          
                          sx={{ ml: -2, cursor: 'pointer' }}
>
                            {passwordVisibility[item._id] ? 'Cacher' : 'Afficher'}
                          </Typography>
                        </Typography>

                        {/* Afficher ou cacher le mot de passe en fonction de l'état */}
                        <Typography variant="body2" color="text.primary">
                          {passwordVisibility[item._id] ? item.password : '**********'} {/* Mot de passe caché par défaut */}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Aucun élément important trouvé.
                  </Typography>
                )}
            <Button
              onClick={() => { navigate('/dashboard/list-elements-important') }}

              variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}>
              Voir Tous les Éléments Importants
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Accueil;
