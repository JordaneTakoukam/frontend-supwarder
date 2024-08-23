import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Snackbar, Alert, InputAdornment } from '@mui/material';
import { CloudUpload, FileCopy, ErrorOutline } from '@mui/icons-material';
import Papa from 'papaparse'; // Assurez-vous que papaparse est correctement importé

const Import = () => {
  const [file, setFile] = useState(null);
  const [importStatus, setImportStatus] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      setImportStatus('Veuillez sélectionner un fichier.');
      setOpenSnackbar(true);
      return;
    }

    const fileType = file.type;
    if (fileType !== 'application/json' && !fileType.includes('csv')) {
      setImportStatus('Type de fichier non supporté. Veuillez télécharger un fichier JSON ou CSV.');
      setOpenSnackbar(true);
      return;
    }

    if (fileType.includes('json')) {
      // Handle JSON file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          console.log('Données JSON importées :', data);
          // Process JSON data here
          setImportStatus('Fichier JSON importé avec succès.');
          setOpenSnackbar(true);
        } catch (error) {
          setImportStatus('Erreur lors de la lecture du fichier JSON.');
          setOpenSnackbar(true);
        }
      };
      reader.readAsText(file);
    } else if (fileType.includes('csv')) {
      // Handle CSV file
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log('Données CSV importées :', result.data);
          // Process CSV data here
          setImportStatus('Fichier CSV importé avec succès.');
          setOpenSnackbar(true);
        },
        error: () => {
          setImportStatus('Erreur lors de la lecture du fichier CSV.');
          setOpenSnackbar(true);
        }
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 3, bgcolor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
        Importer des Trousseaux et Éléments
      </Typography>
      
      <Paper elevation={5} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2, color: '#333333' }}>
          Téléchargez un fichier JSON ou CSV
        </Typography>
        
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          sx={{ mb: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155a8a' } }}
        >
          Choisir un fichier
          <input
            type="file"
            accept=".json, .csv"
            onChange={handleFileChange}
            hidden
          />
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          disabled={!file}
          sx={{ mb: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
        >
          Importer
        </Button>

        {file && (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Fichier sélectionné : {file.name}
          </Typography>
        )}
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={importStatus.includes('erreur') ? 'error' : 'success'}>
          {importStatus}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Import;
