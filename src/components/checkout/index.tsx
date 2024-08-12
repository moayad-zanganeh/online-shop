import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { getCookie } from 'cookies-next';

import { useRouter } from 'next/router';

import { grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useUserStore } from '@/store/useUser';
import { useForm } from 'react-hook-form';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const userId = getCookie('access')!;

export default function Checkout() {
  const router = useRouter();
  const { userData, setUserData } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (userData) {
      reset({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        username: userData.username || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
      });
    }
  }, [userData, reset]);

  const onSubmit = (data: any) => {
    setUserData({
      firstname: data.firstname,
      lastname: data.lastname,
      email: '',
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: '',
      state: '',
      postalCode: '',
      username: '',
    });

    router.push('/payment');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Container
        sx={{
          borderRadius: '15px',
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 4,
            bgcolor: 'white',
            py: 1,
            borderRadius: 5,
          }}
        >
          فرم تکمیل اطلاعات شخصی
        </Typography>
        <Box component="form" dir="rtl" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ direction: 'ltr' }}>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="first-name" required>
                {'نام'}
              </FormLabel>
              <TextField
                size="small"
                fullWidth
                id="firstName"
                aria-describedby="firstName"
                {...register('firstname')}
                defaultValue={userData?.firstname || ''}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="last-name" required>
                {'نام خانوادگی'}
              </FormLabel>
              <TextField
                id="lastName"
                size="small"
                fullWidth
                type="text"
                {...register('lastname')}
                defaultValue={userData?.lastname || ''}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="email" required>
                {'پست الکرونیکی'}
              </FormLabel>
              <TextField id="email" size="small" fullWidth type="email" />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="phone-number" required>
                {'شماره تلفن همراه'}
              </FormLabel>
              <TextField
                id="phone-number"
                size="small"
                fullWidth
                type="number"
                {...register('phoneNumber')}
                defaultValue={userData?.phoneNumber || ''}
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="address1" required>
                {'آدرس'}
              </FormLabel>
              <TextField
                id="address"
                size="small"
                fullWidth
                type="text"
                {...register('address')}
                defaultValue={userData?.address || ''}
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="date-of-registration" required>
                {'استان'}
              </FormLabel>
              <TextField id="state" size="small" fullWidth type="text" />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="date-of-registration" required>
                {'شهر'}
              </FormLabel>
              <TextField id="city" size="small" fullWidth type="text" />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="date-of-registration" required>
                {'کد پستی'}
              </FormLabel>
              <TextField id="postalCode" size="small" fullWidth type="text" />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="date-of-registration" required>
                {'تاریخ ثبت'}
              </FormLabel>
              <TextField
                defaultValue={today}
                disabled
                id="date"
                size="small"
                fullWidth
                type="date"
              />
            </FormGrid>

            <FormGrid item xs={12} sx={{ py: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#f01436',
                  color: 'white',
                  ':hover': { backgroundColor: '#f01436', color: 'white' },
                }}
              >
                ذخیره و پرداخت
              </Button>
            </FormGrid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
