import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFetchAuth } from '@/api/auth/auth.query';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: loginUser, isError } = useFetchAuth();
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username: name,
      password: password,
    };
    loginUser(user, {
      onSuccess: (data) => console.log(data),
      onError: (shalghm) => console.log('error', shalghm),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={10} sx={{ padding: 3, borderRadius: '10px', mt: 8 }}>
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
            {'Sign In'}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            {name.length <= 0 && (
              <Typography variant="body2" color="error" sx={{ color: 'red' }}>
                نام کاربری وارد نشده.{' '}
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {password.length < 8 && (
              <Typography variant="body2" color="error" sx={{ color: 'red' }}>
                رمز وارد شده کمتر از 8 رقم است.{' '}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}{' '}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <GoogleIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
