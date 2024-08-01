import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import { useFetchSingleProduct } from '@/api/products/products.querys';

const SingleCard = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useFetchSingleProduct(productId);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!data) {
    return <Typography>Product not found</Typography>;
  }

  const product = data.data.product;

  return (
    <Box sx={{ display: 'flex', mx: 3 }}>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          height="300"
          image={
            product.images && product.images.length > 0
              ? `http://${product.images[0]}`
              : '/placeholder.jpg'
          }
          alt={product.name}
          sx={{ width: '25%' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            width: '30%',
            mx: '2%',
            borderRadius: '15px',
            border: 'solid 1px gray',
            backgroundColor: '#f7f7f7',
            display: 'flex',
            flexDirection: 'column',
            height: '300px',
            my: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography gutterBottom component="span" sx={{ fontSize: '20px' }}>
              فروشنده
            </Typography>
            <Typography gutterBottom component="span" sx={{ fontSize: '20px' }}>
              13 فروشنده دیگر
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 7,
            }}
          >
            <Typography gutterBottom component="span" sx={{ fontSize: '20px' }}>
              اورانوس{' '}
            </Typography>
            <Box>
              <Typography
                gutterBottom
                component="span"
                sx={{ fontSize: '17px', mx: 1 }}
              >
                عملکرد{' '}
              </Typography>
              <Typography
                gutterBottom
                variant="h4"
                component="span"
                sx={{ fontSize: '17px', color: 'green' }}
              >
                عالی{' '}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '20px',
                fontWeight: '600',
                textAlign: 'right',
                my: 3,
              }}
            >
              {product.price} تومان
            </Typography>
            <Button
              sx={{
                backgroundColor: '#ee384e',
                color: 'white',
                fontWeight: '700',
                fontSize: '18px',
              }}
            >
              افزودن به سبد خرید
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleCard;
