import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardMedia, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
  authLocalization,
  headerMenoLocalization,
} from '@/constants/localization';
import { useCart } from '@/context/cartContext';
import { useUserStore } from '@/store/useUser';
import MenuHeader from './menu-header';

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(4),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  top: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // padding: theme.spacing(0, 4, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    position: 'relative',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}));

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();
  const user = useUserStore((state) => state.userData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    useUserStore.getState().setUserData(null);
    router.push('/');
    handleMenuClose();
  };

  const handleAdminDashboard = () => {
    router.push('/admin/dashboard');
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', top: '0' }}>
        <Toolbar>
          <Box sx={{ color: 'red', fontSize: '28px', fontWeight: 900 }}>
            Uranus
          </Box>
          <Search sx={{ backgroundColor: '#f0f0f1' }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ mx: '5%', color: '#a1a3a8', ml: 1 }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ py: '1%', color: '#81878e' }}
              placeholder={headerMenoLocalization.search}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} component="div" />
          <Box
            component="div"
            sx={{
              border: 'solid 1px #ededee',
              width: user ? 'auto' : '13%',
              padding: '0.5%  1%',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              cursor: user ? 'pointer' : 'pointer',
            }}
            onClick={user ? handleProfileMenuOpen : undefined}
          >
            {user ? (
              <Typography variant="body1" sx={{ color: 'black' }}>
                {headerMenoLocalization.hello} {user.firstname}
              </Typography>
            ) : (
              <>
                <Box component="span" sx={{ color: 'black', margin: '0 7%' }}>
                  <LoginIcon sx={{ transform: 'rotate(180deg)' }} />
                </Box>
                <Box
                  component="span"
                  sx={{ color: 'black', fontSize: '17px' }}
                  onClick={() => router.push('/auth')}
                >
                  {authLocalization.signin}
                </Box>
                <Box
                  component="span"
                  sx={{
                    margin: '0 5%',
                    backgroundColor: '#b5b5b5',
                    height: '20px',
                    width: '1%',
                  }}
                ></Box>
                <Box
                  component="span"
                  sx={{ color: 'black' }}
                  onClick={() => router.push('/auth')}
                >
                  {authLocalization.signup}
                </Box>
              </>
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {user?.isAdmin && (
              <MenuItem onClick={handleAdminDashboard}>
                Admin Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              {headerMenoLocalization.logout}
            </MenuItem>
          </Menu>
          <Box sx={{ width: '5%', display: 'flex', margin: '0 1%' }}>
            <Box
              component="div"
              sx={{
                backgroundColor: '#b5b5b5',
                width: '1%',
                height: '30px',
                margin: '7% 0 0 1%',
              }}
            ></Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleCartClick}
                sx={{ color: 'black', mx: 1 }}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <MenuHeader />
    </Box>
  );
}
