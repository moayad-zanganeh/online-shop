import React from 'react';
import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey, red } from '@mui/material/colors';
import useCartStore from '@/store/useCartStore';

const CardOfCart = ({ product }) => {
  const { name, price, image, quantity, _id } = product;

  const removeProduct = useCartStore((state) => state.removeProduct);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddQuantity = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleReduceQuantity = () => {
    if (quantity > 1) {
      addToCart({ ...product, quantity: -1 });
    }
  };

  const handleRemove = () => {
    console.log('Removing product with ID:', _id);
    removeProduct(_id);
  };

  // محاسبه قیمت نهایی
  const totalPrice = price * quantity;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          borderRadius: '15px',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            image && image.length > 0
              ? `http://${image[0]}`
              : '/placeholder.jpg'
          }
          alt={name || 'No image available'}
          sx={{ width: '180px', mx: 'auto', my: 2 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
          <Typography variant="h5" sx={{ mx: 2, fontSize: '20px' }}>
            {name}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            color="text.primary"
            sx={{ mt: 5, position: 'absolute', bottom: 10, right: 20 }}
          >
            {totalPrice !== undefined && totalPrice !== null
              ? totalPrice.toLocaleString('fa')
              : 'نامشخص'}{' '}
            تومان
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center', mx: 'auto', my: 5 }}
          >
            <IconButton
              sx={{ backgroundColor: grey[200], mr: 1 }}
              onClick={handleReduceQuantity}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 1 }}>
              {quantity}
            </Typography>
            <IconButton
              sx={{ backgroundColor: grey[200], mr: 1 }}
              onClick={handleAddQuantity}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              sx={{ backgroundColor: red[200], ml: 1 }}
              onClick={handleRemove}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardOfCart;
