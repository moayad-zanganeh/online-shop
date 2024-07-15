import * as React from 'react';
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Card, CardMedia, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuHeader from './menu-header';
import { useRouter } from 'next/router';

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
  padding: theme.spacing(0, 0, 1.5, 1),
  height: '100%',
  marginRight: '1%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 6, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', top: '0' }}>
        <Toolbar>
          <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
            <CardMedia
              component="img"
              height="140"
              image="https://www.digikala.com/statics/img/svg/logo.svg"
              alt="Uranus-Image"
            />
          </Card>
          <Search
            sx={{
              paddingLeft: '15%',
              backgroundColor: '#d6d6d6',
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ padding: '2%' }}
              placeholder="جستجو"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} component="div" />
          <Box
            component="div"
            sx={{
              border: 'solid 1px #ededee',
              width: '10%',
              padding: '0.5%',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box component="span" sx={{ color: 'black', margin: '0 3%' }}>
              <LoginIcon sx={{ transform: 'rotate(180deg)' }} />
            </Box>
            <Box
              component="span"
              sx={{ color: 'black', margin: '-3% 0 0 0', fontSize: '17px' }}
              onClick={() => router.push('auth/sign-in')}
            >
              ورود
            </Box>
            <Box
              component="span"
              sx={{
                margin: '0 5%',
                backgroundColor: '#b5b5b5',
                height: '30px',
                width: '1%',
              }}
            ></Box>
            <Box
              component="span"
              sx={{ color: 'black' }}
              onClick={() => router.push('/auth/sign-up')}
            >
              ثبت نام
            </Box>
          </Box>
          <Box
            sx={{
              width: '5%',
              display: 'flex',
              margin: '0 1%',
            }}
          >
            <Box
              component="div"
              sx={{
                backgroundColor: '#b5b5b5',
                width: '1%',
                height: '30px',
                margin: '0 0 0 15%',
              }}
            ></Box>
            <Box component="div">
              <ShoppingCartIcon
                sx={{ transform: 'rotate(1deg)', color: 'black' }}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MenuHeader />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
