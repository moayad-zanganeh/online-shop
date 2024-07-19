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
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: isSignUp ? 'row-reverse' : 'row',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              width: '50%',
              padding: 3,
              backgroundColor: isSignUp ? '#FF416C' : '#FFFFFF',
              color: isSignUp ? '#FFFFFF' : '#000000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5">
              {isSignUp ? 'Hello, Friend!' : 'Welcome Back!'}
            </Typography>
            <Typography>
              {isSignUp
                ? 'Enter your personal details and start your journey with us'
                : 'To keep connected with us please login with your personal info'}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                color: isSignUp ? '#FFFFFF' : '#FF4B2B',
                borderColor: isSignUp ? '#FFFFFF' : '#FF4B2B',
              }}
              onClick={handleSwitch}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </Box>
          <Box
            sx={{
              width: '50%',
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isSignUp ? '#FFFFFF' : '#FF416C',
              color: isSignUp ? '#000000' : '#FFFFFF',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: isSignUp ? 'secondary.main' : 'primary.main',
              }}
            >
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {isSignUp && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus={!isSignUp}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSwitch}>
                    {isSignUp
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
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
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
