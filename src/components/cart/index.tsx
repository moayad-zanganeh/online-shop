import React from 'react';

import { Box, Grid } from '@mui/material';

import { getCookie } from 'cookies-next';
import { useGetAllCartItems } from '@/api/card/card.query';
import TotalCard from './total-card';
import CardOfCart from './card';

const CartPage = () => {
  const userId = getCookie('access')!;

  const { data, refetch } = useGetAllCartItems(userId);
  console.log(data);

  const totalPrice = data?.reduce(
    (sum: number, book: any) => sum + book.quantity * book.price,
    0
  );

  return (
    <Box sx={{ mx: 'auto', display: 'flex', gap: 3, mt: 4 }}>
      <TotalCard totalPrice={totalPrice} />
      <Grid container rowGap={3}>
        {data?.map((book: any, index: React.Key | null | undefined) => {
          return (
            <Grid item key={index} xs={12} md={6}>
              <CardOfCart book={book} refetch={refetch} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CartPage;
