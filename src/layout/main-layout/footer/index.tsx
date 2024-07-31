import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { aboutUranus } from '@/constants/aboutUranus';
import { abouts } from '@/constants/about';

import { baUranus } from '@/constants/baUranus';
import { buyingGuideFromUranus } from '@/constants/buyingGuideFromUranus';
import { customerServices } from '@/constants/customerServices';

const previewText = aboutUranus.text.slice(0, 300);

const Footer = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  return (
    <Box
      component="footer"
      dir="rtl"
      sx={{
        bgcolor: 'white',
        color: 'black',
        mt: 15,
        mx: 2,
      }}
    >
      <Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h3" sx={{ color: 'red' }}>
                اورانوس{' '}
              </Typography>
              <Button
                sx={{
                  color: '#3f4064',
                  border: 'solid 1px #3f4064',
                  borderRadius: '10px',
                  mx: '1%',
                  px: '1%',
                }}
              >
                بازگشت به بالا
                <KeyboardArrowUpIcon />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: '1%' }}>
              {abouts.map((about) => (
                <Typography
                  sx={{ fontSize: '18px', color: '#3f4064', my: '2%' }}
                >
                  {about}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '3%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ color: 'black' }}>
                  با اورانوس
                </Typography>
                {baUranus.map((bUranus) => (
                  <Typography variant="h6" sx={{ color: '#81858B', my: '3%' }}>
                    {bUranus}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: 'black' }}>
                  خدمات مشتریان{' '}
                </Typography>
                {customerServices.map((cservicsed) => (
                  <Typography variant="h6" sx={{ color: '#81858B', my: '3%' }}>
                    {cservicsed}
                  </Typography>
                ))}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: 'black' }}>
                  راهنمای خرید از اورانوس
                </Typography>
                {buyingGuideFromUranus.map((bgfuranus) => (
                  <Typography variant="h6" sx={{ color: '#81858B', my: '3%' }}>
                    {bgfuranus}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', mx: '5%' }}>
                <Typography variant="h5" sx={{ color: 'black' }}>
                  همراه ما باشید!
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    my: '3%',
                    mx: '-3%',
                  }}
                >
                  <IconButton
                    href="https://facebook.com"
                    sx={{
                      color: '#81858B',
                    }}
                  >
                    <Facebook sx={{ fontSize: '45px' }} />
                  </IconButton>
                  <IconButton
                    href="https://twitter.com"
                    sx={{
                      color: '#81858B',
                    }}
                  >
                    <Twitter sx={{ fontSize: '45px' }} />
                  </IconButton>
                  <IconButton
                    href="https://instagram.com"
                    sx={{
                      color: '#81858B',
                    }}
                  >
                    <Instagram sx={{ fontSize: '45px' }} />
                  </IconButton>
                  <IconButton
                    href="https://linkedin.com"
                    sx={{
                      color: '#81858B',
                    }}
                  >
                    <LinkedIn sx={{ fontSize: '45px' }} />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ color: 'black' }}>
                    با ثبت ایمیل، از تخفیف ها باخبر شوید
                  </Typography>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <TextField
                      label="ایمیل شما"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      sx={{
                        textAlign: 'right',
                        backgroundColor: '#f0f0f1',
                        height: '55px',
                      }}
                    />
                    <Button
                      sx={{
                        backgroundColor: '#e0e0e2',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 900,
                        mx: '3%',
                        my: '5%',
                        height: '55px',
                      }}
                    >
                      ثبت
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{ my: 4, borderColor: 'gray.700', width: '98%', mx: '1%' }}
        />
        <Box>
          <Typography variant="h4">
            فروشگاه اینترنتی اورانوس، بررسی، انتخاب و خرید آنلاین
          </Typography>
          <Box sx={{ padding: '0.5%', my: '1%', width: '50%' }}>
            <Typography variant="body1">
              {showMore ? aboutUranus.text : `${previewText}...`}
            </Typography>
            <Button
              onClick={toggleShowMore}
              variant="contained"
              color="primary"
              sx={{
                marginTop: '2%',
                width: '20%',
                color: '#1976d2',
                backgroundColor: 'white',
                boxShadow: 'none',

                ':hover': {
                  backgroundColor: 'white',
                  boxShadow: 'none',
                },
              }}
            >
              {showMore ? 'بستن' : 'مشاهده بیشتر'}
              <KeyboardArrowLeftIcon sx={{ my: '1%', mx: '2%' }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
