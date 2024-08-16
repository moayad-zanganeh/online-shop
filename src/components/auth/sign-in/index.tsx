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
import { useUserStore } from '@/store/useUser';
import { SetSearchParamsType } from '@/types/auth';
import { authLocalization } from '@/constants/localization';

export default function SignIn({ setSearchParams }: SetSearchParamsType) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: loginUser } = useFetchLogin();
  console.log(loginUser);
  const router = useRouter();
  const { setUserData } = useUserStore();

  const handleLoginSuccess = (data: any) => {
    setCookie('access', data.data.user._id);
    setCookie('role', data.data.user.role);
    setCookie('accessToken', data.token.accessToken);
    setCookie('refreshToken', data.token.refreshToken);
    setUserData({
      firstname: data.data.user.firstname,
      lastname: data.data.user.lastname,
      email: '',
      phoneNumber: data.data.user.phoneNumber,
      address: data.data.user.address,
      city: '',
      state: '',
      postalCode: '',
      username: '',
    });
    router.push('/');
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username: name,
      password: password,
    };

    loginUser(user, {
      onSuccess: (data) => {
        handleLoginSuccess(data);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      },
    });
  };

  const handleSignUp = () => {
    setSearchParams({ action: 'signup' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={10} sx={{ padding: 3, borderRadius: '10px', mt: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                color: 'red',
                fontSize: '28px',
                fontWeight: 900,
                maxWidth: 150,
              }}
            >
              Uranus
            </Box>
          </Box>
          <Typography component="h1" variant="h4" sx={{ textAlign: 'left' }}>
            {authLocalization.signin}
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
              {authLocalization.signin}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  onClick={handleSignUp}
                  variant="body2"
                  sx={{
                    color: 'black',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  {authLocalization.notRegister}
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
