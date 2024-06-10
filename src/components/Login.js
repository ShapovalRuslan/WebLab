import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { doSignInWithEmailAndPassword } from '../auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const user = await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error("Error signing in:", error);
    }
  };

 

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Box>
  );
}

export default Login;
