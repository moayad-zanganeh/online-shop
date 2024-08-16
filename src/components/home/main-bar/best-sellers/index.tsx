import { useFetchProduct } from '@/api/products/products.querys';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import { Loading } from '@/components/shared/loading';
import { bestSellersLocalization } from '@/constants/localization';

function BestSellers() {
  const { data: productAll, error, isLoading } = useFetchProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const productsPerPage = 9;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!productAll || !Array.isArray(productAll.data.products)) {
    console.error('Invalid product data:', productAll);
    return <Typography>No data available</Typography>;
  }

  const dataProducts = productAll.data.products.map((product, index) => ({
    id: product._id,
    name: product.name,
    images: product.images,
    index: index + 1,
  }));

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

  const handleClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '95%',
        mx: 'auto',
        my: '10%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        boxSizing: 'border-box',
        border: 'solid 1px #f0f0f5',
        position: 'relative',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'right', width: '60%', my: '1%' }}
        >
          {bestSellersLocalization.bestSellers}
        </Typography>
        <Button
          onClick={handlePageProducts}
          sx={{
            fontSize: '22px',
            mr: '2%',
            ml: '30%',
            ':hover': { backgroundColor: 'white' },
          }}
        >
          {bestSellersLocalization.viewMore}
        </Button>
      </Box>

      {visibleProducts.map((product, index) => (
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
            cursor: 'pointer',
          }}
          onClick={() => handleClick(product.id)}
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
              <Typography
                variant="h4"
                sx={{ color: '#19bfd3', mx: '2%', fontSize: '25px', mr: '6%' }}
              >
                {product.index}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  borderBottom: 'solid 1px #f0f0f1',
                  fontSize: '15px',
                  py: 1,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'normal',
                }}
              >
                {product.name.slice(0, 40)}...{' '}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      <Box
        onClick={handleNextPage}
        sx={{
          position: 'absolute',
          right: '1%',
          backgroundColor: 'white',
          borderRadius: '50%',
          width: '3%',
          height: '8%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIosIcon
          sx={{ position: 'relative', right: '40%', top: '25%' }}
        />
      </Box>
    </Box>
  );
}

export default BestSellers;
