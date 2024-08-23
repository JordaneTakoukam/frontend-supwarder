import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Snackbar, Alert } from '@mui/material';
import { CloudDownload, FileCopy, ErrorOutline } from '@mui/icons-material';

const Export = () => {
  const [exportStatus, setExportStatus] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Dummy data for export
  const data = [
    { id: 1, name: 'Trousseau 1', item: 'Identifiant 1', user: 'Utilisateur 1', uri: 'URI 1' },
    { id: 2, name: 'Trousseau 2', item: 'Identifiant 2', user: 'Utilisateur 2', uri: 'URI 2' },
  ];

  const handleExport = (format) => {
    if (format === 'json') {
      // Export as JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'trousseaux.json';
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('Fichier JSON exporté avec succès.');
    } else if (format === 'csv') {
      // Export as CSV
      const csvRows = [
        ['ID', 'Nom', 'Élément', 'Utilisateur', 'URI'],
        ...data.map(row => [row.id, row.name, row.item, row.user, row.uri])
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'trousseaux.csv';
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('Fichier CSV exporté avec succès.');
    } else {
      setExportStatus('Format d\'exportation non supporté.');
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 3, bgcolor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
        Exporter des Trousseaux et Éléments
      </Typography>
      
      <Paper elevation={5} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333333' }}>
          Sélectionnez le format d'exportation
        </Typography>
        
        <Button
          variant="contained"
          onClick={() => handleExport('json')}
          startIcon={<CloudDownload />}
          sx={{ mb: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}
        >
          Exporter en JSON
        </Button>
        
        <Button
          variant="contained"
          onClick={() => handleExport('csv')}
          startIcon={<CloudDownload />}
          sx={{ mb: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
        >
          Exporter en CSV
        </Button>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={exportStatus.includes('erreur') ? 'error' : 'success'}>
          {exportStatus}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Export;
