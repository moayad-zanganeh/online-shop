import { useFetchProduct } from '@/api/products/products.queris';
import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';

function BestSellers() {
  const { data: productAll, error, isLoading } = useFetchProduct();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!productAll || !Array.isArray(productAll.data.products)) {
    console.error('Invalid product data:', productAll);
    return <Typography>No data available</Typography>;
  }

  const dataProducts = productAll.data.products.map(
    (product: any, index: number) => ({
      id: index + 1,
      name: product.name,
      images: product.images,
    })
  );

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '95%',
        mx: 'auto',
        my: '3%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', width: '100%', my: '1%' }}
      >
        پر فروش ترین ها
      </Typography>
      {dataProducts.map((product: any) => (
        <Box
          key={product.id}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: '31%',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '10px',
            mx: '1%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              py: '2%',
              my: '2%',
              mx: 'auto',
              width: '70%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                product.images && product.images.length > 0
                  ? `http://${product.images[0]}`
                  : '/placeholder.jpg'
              }
              alt={product.name}
              sx={{ width: '25%', ml: '5%' }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '1rem',
                width: '100%',
              }}
            >
              <Typography variant="h4" sx={{ color: 'blue', mx: '2%' }}>
                {product.id}
              </Typography>
              <Typography variant="h6" sx={{ mx: '4%' }}>
                {product.name.slice(0, 50)}...
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default BestSellers;
