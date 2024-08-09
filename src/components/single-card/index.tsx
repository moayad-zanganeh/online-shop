import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useFetchSingleProduct } from '@/api/products/products.querys';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCartStore from '@/store/useCartStore';

const SingleCard = ({ productId }: { productId: string }) => {
  const { data, error, isLoading } = useFetchSingleProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
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
  const productIds = product._id;
  const productName = product.name;
  const productPrices = product.price;
  const productImg = product.images;

  // console.log(product);

  // const handleAddToCart = () => {
  //   if (quantity > product.quantity) {
  //     toast.error('موجودی انبار کافی نیست');
  //     return;
  //   }
  //   setIsAddedToCart(true);
  // };

  const handlePlaceOrder = () => {
    if (quantity > product.quantity) {
      setQuantity(quantity + 1);
      toast.error('موجودی انبار کافی نیست');
      return;
    }

    product.quantity -= quantity;
    toast.success('سفارش شما ثبت شد');
    setIsAddedToCart(false);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = (product) => {
    console.log(product);
    if (quantity > product.quantity) {
      toast.error('موجودی انبار کافی نیست');
      return;
    }
    setIsAddedToCart(true);
    const productToAdd = {
      _id: productIds,
      name: productName,
      price: productPrices,
      quantity: quantity,
      image: productImg,
    };
    console.log(productToAdd);
    addToCart(productToAdd);
    setQuantity(0);
    toast.success('سفارش شما ثبت شد');
  };
  return (
    <Box sx={{ display: 'flex', mx: 3 }}>
      <ToastContainer />
      <Card sx={{ display: 'flex', width: '100%' }}>
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
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: '18px', color: 'gray', mt: 3 }}
          >
            توضیحات کوتاه : {product.description}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: '18px', color: 'gray', my: 3 }}
          >
            برند : {product.brand}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: '18px', color: 'gray' }}
          >
            میزان موجودی در انبار : {product.quantity}
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

            {isAddedToCart ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mx: 'auto',
                    py: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#ee384e',
                      borderRadius: '15px 0 0 15px',
                    }}
                  >
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={decrementQuantity}
                    >
                      <Remove />
                    </IconButton>
                  </Box>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <Box
                    sx={{
                      backgroundColor: '#ee384e',
                      borderRadius: '0 15px 15px 0',
                    }}
                  >
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={incrementQuantity}
                    >
                      <Add />
                    </IconButton>
                  </Box>

                  <Button
                    onClick={handlePlaceOrder}
                    sx={{
                      backgroundColor: '#ee384e',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '18px',
                      ml: 5,
                      ':hover': { backgroundColor: '#ee384e', color: 'white' },
                    }}
                  >
                    ثبت سفارش
                  </Button>
                </Box>
              </>
            ) : (
              <Button
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: '#ee384e',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '18px',
                  ':hover': { backgroundColor: '#ee384e', color: 'white' },
                }}
              >
                افزودن به سبد خرید
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleCard;
