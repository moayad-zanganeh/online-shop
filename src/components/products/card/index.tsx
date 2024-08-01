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
import { useFetchProduct } from '@/api/products/products.querys';
import { useRouter } from 'next/router';

export default function Cards() {
  const { data: productAll, error, isLoading } = useFetchProduct();
  const [currentPage, setCurrentPage] = React.useState(1);
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

  const dataProducts = productAll.data.products.map((product: any) => ({
    id: product._id,
    name: product.name,
    images: product.images,
    price: product.price,
  }));

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = dataProducts.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

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
        {dataProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: 300,
                height: '500px',
                margin: 'auto',
              }}
              onClick={() => handleCardClick(product.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.images && product.images.length > 0
                      ? `http://${product.images[0]}`
                      : '/placeholder.jpg'
                  }
                  alt={product.name}
                  sx={{ mx: 'auto', width: '100%' }}
                />
                <CardContent>
                  <Typography
                    sx={{ fontSize: '20px' }}
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
                    fontSize: '20px',
                    textAlign: 'right',
                  }}
                >
                  {product.price} تومان
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(dataProducts.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}
