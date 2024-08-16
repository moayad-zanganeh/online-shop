import { Box, Typography } from '@mui/material';
import useCartStore from '@/store/useCartStore';
import CardOfCart from './card';
import TotalCard from './total-card';
import { cardLocalization } from '@/constants/localization';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return (
    <Box sx={{ m: '2%', display: 'flex', justifyContent: 'space-between' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '70%',
        }}
      >
        {cart.length === 0 ? (
          <Typography variant="body1">
            {cardLocalization.notShopping}
          </Typography>
        ) : (
          cart.map((product) => (
            <CardOfCart key={product._id} product={product} />
          ))
        )}
      </Box>

      <Box sx={{ width: '25%', mx: '5%' }}>
        <TotalCard totalPrice={totalPrice} />
      </Box>
    </Box>
  );
};

export default Cart;
