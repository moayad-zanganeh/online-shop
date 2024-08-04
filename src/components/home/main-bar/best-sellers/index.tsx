import { useFetchProduct } from '@/api/products/products.querys';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
function BestSellers() {
  const { data: productAll, error, isLoading } = useFetchProduct();
  console.log(productAll);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const productsPerPage = 9;
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

  const totalPages = Math.ceil(dataProducts.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage < totalPages) {
        return prevPage + 1;
      }
      return prevPage;
    });
  };
  const handlePageProducts = () => {
    router.push('/products');
  };
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = dataProducts.slice(startIndex, endIndex);

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
        sx={{ textAlign: 'center', width: '90%', my: '1%', mx: 'auto' }}
      >
        پر فروش ترین ها
      </Typography>
      <Button
        onClick={handlePageProducts}
        sx={{
          fontSize: '22px',
          mr: '2%',
          ':hover': { backgroundColor: 'white' },
        }}
      >
        مشاهده همه
      </Button>
      {visibleProducts.map((product: any) => (
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
      <Box
        onClick={handleNextPage}
        sx={{
          position: 'absolute',
          right: '3%',
          backgroundColor: 'white',
          borderRadius: '50%',
          width: '3%',
          height: '8%',
        }}
      >
        <ArrowBackIosIcon
          sx={{ position: 'absolute', right: '40%', top: '25%' }}
        />
      </Box>
    </Box>
  );
}

export default BestSellers;
