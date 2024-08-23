import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Divider, Paper } from '@mui/material'; // Assurez-vous que Paper est importé
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, AccountCircle, Description, Create, VpnKey, Settings, GetApp, ImportExport, Chat, Group } from '@mui/icons-material';
import CreationElementForm from '../components/CreationElementForm';
import PasswordGenerator from '../components/PasswordGenerator';
import CreationTrousseauForm from '../components/CreationTrousseauForm';
import TrousseauList from '../components/TrousseauList';
import TrousseauPage from '../pages/TrousseauPage';
import Messagerie from '../components/Messagerie';
import Import from '../components/Import'
import Export from '../components/Export';
import Parametres from '../components/Parametres';
import Accueil from '../components/Accueil';
import '../styles/Dashboard.css';

const drawerWidth = 240;

const menuItems = [
  { text: 'Accueil', icon: <Home />, path: 'accueil' },
  { text: 'Comptes', icon: <AccountCircle />, path: 'comptes' },
  { text: 'Documents', icon: <Description />, path: 'documents' },
  { text: 'Génération de mot de passe', icon: <Create />, path: 'generation-de-mot-de-passe' },
  { text: 'Création d\'un trousseau', icon: <VpnKey />, path: 'creation-dun-trousseau' },
  { text: 'Création d\'un élément', icon: <Create />, path: 'creation-dun-element' },
  { text: 'Paramètres', icon: <Settings />, path: 'parametres' },
  { text: 'Exporter', icon: <GetApp />, path: 'exporter' },
  { text: 'Import', icon: <ImportExport />, path: 'import' },
  { text: 'Messagerie instantanée', icon: <Chat />, path: 'messagerie' },
  { text: 'Liste des Trousseaux', icon: <Group />, path: 'list-trousseaux' }
];

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const [selectedPath, setSelectedPath] = React.useState(currentPath);

  React.useEffect(() => {
    setSelectedPath(currentPath);
  }, [currentPath]);

  const handleItemClick = (path) => {
    setSelectedPath(path);
  };

  const currentMenuItem = menuItems.find(item => item.path === selectedPath);
  const pageTitle = currentMenuItem ? currentMenuItem.text : 'Bienvenue sur SUPWARDEN';

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            color: '#333333',
            borderRight: '1px solid #ddd',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ padding: 2, textAlign: 'center', fontWeight: 'bold' }}>
          SUPWARDEN
        </Typography>
        <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/dashboard/${path}`}
              sx={{
                padding: 1.5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: selectedPath === path ? '#dbe9f4' : 'transparent',
                borderRadius: '8px',
                border: selectedPath === path ? '2px solid #0044cc' : 'none',
                boxShadow: selectedPath === path ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                transition: 'background-color 0.3s, border 0.3s, box-shadow 0.3s',
                '&:hover': {
                  backgroundColor: selectedPath === path ? '#dbe9f4' : '#f5f5f5',
                  boxShadow: selectedPath === path ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
              }}
              onClick={() => handleItemClick(path)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                {icon}
              </Box>
              <ListItemText primary={text} sx={{ marginLeft: 1 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            {pageTitle}
          </Typography>
        </Paper>

        <Routes>
          <Route path="accueil" element={<Accueil/>} />
          <Route path="comptes" element={<div>Comptes Content</div>} />
          <Route path="documents" element={<div>Documents Content</div>} />
          <Route path="generation-de-mot-de-passe" element={<PasswordGenerator />} />
          <Route path="creation-dun-trousseau" element={<CreationTrousseauForm />} />
          <Route path="creation-dun-element" element={<CreationElementForm />} />
          <Route path="parametres" element={<Parametres/>} />
          <Route path="exporter" element={<Export/>} />
          <Route path="import" element={<Import/>} />
          <Route path="messagerie" element={<Messagerie />} />
          <Route path="list-trousseaux" element={<TrousseauList />} />
          <Route path="groupe/:trousseauName" element={<TrousseauPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
