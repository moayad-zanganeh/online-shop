// src/components/Header.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Box,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router'; // Import useRouter
import { useCart } from '@/context/cartContext'; // Import useCart

const Header: React.FC = () => {
  const { cart } = useCart(); // Use useCart
  const router = useRouter(); // Use useRouter

  const handleCartClick = () => {
    router.push('/cart'); // Navigate to cart page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          فروشگاه اینترنتی
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleCartClick} color="inherit">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
