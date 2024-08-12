import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { pages } from '@/constants/pages';
import { Typography } from '@mui/material';
import { menoLocalization } from '@/constants/localization';
import ModalCategories from './modal-categories';

function MenuHeader() {
  const [open, setOpen] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'white', boxShadow: 'none', marginTop: '5%' }}
    >
      <Toolbar>
        <Box
          sx={{
            ':hover': { background: 'white' },
            flexGrow: 1,
            gap: '1%',
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
          }}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            onMouseEnter={handleMouseEnter}
            sx={{
              my: 2,
              color: '#b5b5b5',
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
              cursor: 'pointer',
              '&:hover': {
                borderBottom: 'solid 1px red',
                backgroundColor: 'white',
              },
            }}
          >
            <MenuIcon sx={{ color: '#b5b5b5', mr: '10px' }} />
            <Typography>{menoLocalization.ClassificationOfGoods}</Typography>
          </Button>
          {pages.map((page) => (
            <Typography
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: '#b5b5b5',
                display: 'block',
                fontSize: '18px',
                cursor: 'pointer',
                '&:hover':
                  page !== '|'
                    ? {
                        borderBottom: 'solid 1px red',
                        backgroundColor: 'white',
                      }
                    : { backgroundColor: 'white', cursor: 'auto' },
              }}
            >
              {page}
            </Typography>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          ></Menu>
        </Box>
      </Toolbar>
      <ModalCategories
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </AppBar>
  );
}

export default MenuHeader;
