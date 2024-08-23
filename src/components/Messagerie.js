import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Paper, Divider, IconButton, Avatar, Tabs, Tab } from '@mui/material';
import { Send, Group, Person } from '@mui/icons-material';

const Messagerie = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState('group'); // 'group' or 'private'
  const [tabValue, setTabValue] = useState(0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'Utilisateur', type: messageType }]);
      setNewMessage('');
    }
  };

  const handleChangeMessageType = (event, newValue) => {
    setTabValue(newValue);
    setMessageType(newValue === 0 ? 'group' : 'private');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Discussion
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleChangeMessageType} aria-label="message-type-tabs">
          <Tab label="Discussion de Groupe" icon={<Group />} iconPosition="start" />
          <Tab label="Message Privé" icon={<Person />} iconPosition="start" />
        </Tabs>
      </Box>

      <Paper elevation={3} sx={{ flexGrow: 1, mb: 3, p: 2, maxHeight: 'calc(100% - 100px)', overflowY: 'auto', borderRadius: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <Avatar sx={{ bgcolor: msg.type === 'group' ? 'primary.main' : 'secondary.main' }}>
                {msg.sender.charAt(0)}
              </Avatar>
              <ListItemText
                primary={msg.text}
                secondary={`De: ${msg.sender} ${new Date().toLocaleTimeString()}`}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <TextField
          label="Écrire un message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Messagerie;
