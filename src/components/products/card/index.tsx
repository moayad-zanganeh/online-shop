import * as React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
  Box,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useFetchProduct } from '@/api/products/products.querys';
import { Loading } from '@/components/shared/loading';
import { cardLocalization } from '@/constants/localization';

const Cards = ({ filterParams }) => {
  const { data: productAll, error, isLoading } = useFetchProduct();
  const [currentPage, setCurrentPage] = React.useState(1);
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

  const allProducts = productAll.data.products.map((product: any) => ({
    id: product._id,
    name: product.name,
    images: product.images,
    price: product.price,
    brand: product.brand,
  }));

  let filteredProducts = allProducts;

  if (Object.keys(filterParams).length > 0) {
    filteredProducts = allProducts.filter((product) => {
      const matchesCategory =
        !filterParams.category || product.brand === filterParams.category;
      const matchesPrice =
        product.price >= filterParams.price_gte &&
        product.price <= filterParams.price_lte;
      return matchesCategory && matchesPrice;
    });

    if (filterParams._order === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filterParams._order === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleCardClick = (id: string) => {
    if (id) {
      router.push(`/products/${id}`);
    } else {
      console.error('Product ID is undefined');
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {currentProducts?.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: 300,
                height: '400px',
                margin: 'auto',
                position: 'relative',
              }}
              onClick={() => handleCardClick(product.id)}
            >
              <CardActionArea
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    product.images && product.images.length > 0
                      ? `http://${product.images[0]}`
                      : '/placeholder.jpg'
                  }
                  alt={product.name}
                  sx={{ mx: 'auto', width: '60%' }}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: '20px', mb: 5 }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '18px',
                    textAlign: 'right',
                    position: 'absolute',
                    bottom: 5,
                    right: 10,
                  }}
                >
                  {product.price.toLocaleString()} {cardLocalization.toman}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default Cards;
