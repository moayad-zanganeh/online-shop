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
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import { useRouter } from 'next/router';
import { useFetchAuth } from '@/api/auth/auth.query';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: loginUser } = useFetchAuth();
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      username: name,
      password: password,
    };

    loginUser(user, {
      onSuccess: (data: any) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        if (data.user.role === 'ADMIN') {
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
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
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
              label="نام کاربری"
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
              label="پسورد"
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
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  قبلا ثبت نام نکرده اید؟ ثبت نام
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
