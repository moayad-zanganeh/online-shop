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
import { useFetchSignUp } from '@/api/auth/auth.query';
import { useRouter } from 'next/router';
import { authLocalization } from '@/constants/localization';
import { SetSearchParamsType } from '@/types/auth';
import { useUserStore } from '@/store/useUser';
import { setCookie } from 'cookies-next';

export default function SignUp({ setSearchParams }: SetSearchParamsType) {
  const { mutate: signUp } = useFetchSignUp();
  const router = useRouter();
  const [userAbout, setUserAbout] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phoneNumber: '',
    address: '',
    password: '',
  });
  const { setUserData } = useUserStore();

  const handleSignUpSuccess = (data: any) => {
    const { user, token } = data.data;
    setCookie('userId', user._id);
    setCookie('role', user.role);
    setCookie('accessToken', token.accessToken);
    setCookie('refreshToken', token.refreshToken);
    setUserData({
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: '',
      state: '',
      postalCode: '',
      username: user.username,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAbout((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(
      {
        firstName: userAbout.firstname,
        lastName: userAbout.lastname,
        username: userAbout.username,
        password: userAbout.password,
        phoneNumber: userAbout.phoneNumber,
        address: userAbout.address,
      },
      {
        onSuccess: handleSignUpSuccess,
      }
    );
  };

  const handleSignIn = () => {
    setSearchParams({ action: 'signin' });
  };
  const handleSignUp = () => {
    router.push('/');
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
            {authLocalization.signup}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="firstname"
              label={authLocalization.firstname}
              name="firstname"
              value={userAbout.firstname}
              autoComplete="firstname"
              autoFocus
              sx={{ width: '49%' }}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '49%' }}
              variant="outlined"
              margin="normal"
              required
              id="lastname"
              label={authLocalization.lastname}
              name="lastname"
              value={userAbout.lastname}
              autoComplete="lastname"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '49%' }}
              variant="outlined"
              margin="normal"
              required
              id="username"
              label={authLocalization.username}
              name="username"
              value={userAbout.username}
              autoComplete="username"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '49%' }}
              variant="outlined"
              margin="normal"
              required
              name="password"
              label={authLocalization.password}
              type="password"
              id="password"
              value={userAbout.password}
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '49%' }}
              variant="outlined"
              margin="normal"
              required
              id="phoneNumber"
              label={authLocalization.phoneNumber}
              name="phoneNumber"
              value={userAbout.phoneNumber}
              autoComplete="phoneNumber"
              onChange={handleChange}
            />
            <TextField
              sx={{ width: '49%' }}
              variant="outlined"
              margin="normal"
              required
              id="address"
              label={authLocalization.address}
              name="address"
              value={userAbout.address}
              autoComplete="address"
              onChange={handleChange}
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
              onClick={handleSignUp}
            >
              {authLocalization.signup}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="#"
                  onClick={handleSignIn}
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: 'black',
                  }}
                >
                  {authLocalization.alreadyRegistered} {authLocalization.signin}
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
