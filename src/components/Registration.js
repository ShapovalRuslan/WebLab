import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { doCreateUserWithEmailAndPassword } from '../auth';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async () => {
      try {
          const user = await doCreateUserWithEmailAndPassword(email, password);
          console.log("User signed in:", user);
      } catch (error) {
          console.error("Error signing in:", error);
      }
    };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
        Register
      </Button>
    </Box>
  );
}

export default Registration;
