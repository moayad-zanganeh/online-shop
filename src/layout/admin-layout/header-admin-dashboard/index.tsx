import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Fade, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';

export default function HeaderAadminDashboard() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ee384e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 2 }}
            onClick={handleClick}
            id="fade-icon"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ mx: -2 }}>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem sx={{ fontSize: '20px' }} onClick={handleClose}>
                <Link href={'/'}>خانه</Link>
              </MenuItem>
              <MenuItem sx={{ fontSize: '20px' }} onClick={handleClose}>
                <Link href={'/'}>خروج</Link>
              </MenuItem>
              <MenuItem sx={{ fontSize: '20px' }} onClick={handleClose}>
                <Link href={'/admin-dashboard/product-inventory'}>
                  موجودی و قیمت
                </Link>
              </MenuItem>
              <MenuItem sx={{ fontSize: '20px' }} onClick={handleClose}>
                <Link href={'#'}>وضعیت تحویل سفارش</Link>
              </MenuItem>
            </Menu>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: '23px' }}
            >
              داشبورد
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
