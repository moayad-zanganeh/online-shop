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
  IconButton,
  Card,
  CardMedia,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import { useRouter } from 'next/router';
import { useFetchLogin } from '@/api/auth/auth.query';
import { setCookie } from 'cookies-next';
import { userType } from '@/types/user';
import { authLocalization } from '@/constants/localization';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: loginUser } = useFetchLogin();
  const router = useRouter();

  const handleLoginSuccess = (user: userType) => {
    console.log(user);
    setCookie('access', user.id);
    setCookie('role', user.role);
    setCookie('name', user.firstname);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username: name,
      password: password,
    };

    loginUser(user, {
      onSuccess: (data) => {
        console.log(data);
        setCookie('user', data.user);
        handleLoginSuccess(data.data.user);
        if (data.data.user.role == 'ADMIN') {
          router.push('/admin-dashboard');
        } else {
          router.push('/');
        }
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={10} sx={{ padding: 3, borderRadius: '10px', mt: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Card sx={{ maxWidth: 150, boxShadow: 'none' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://www.digikala.com/statics/img/svg/logo.svg"
                alt="Uranus-Image"
              />
            </Card>
          </Box>
          <Typography component="h1" variant="h4" sx={{ textAlign: 'left' }}>
            {'ورود'}
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
              label={authLocalization.username}
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={authLocalization.password}
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#f01436',
                color: 'white',
                ':hover': { backgroundColor: '#f01436', color: 'white' },
              }}
            >
              ورود
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{
                    color: 'black',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  {authLocalization.notRegister} {authLocalization.signup}
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
