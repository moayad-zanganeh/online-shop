import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';

const images = [
  '/images/honor.jpg',
  '/images/iphone.png',
  '/images/nokia.png',
  '/images/samsung.png',
  '/images/xiaomi.png',
];
const nameBrands = ['آنر', 'آیفون', 'نوکیا', 'سامسنوگ', 'شیائومی'];

function Brands() {
  return (
    <Box sx={{ width: '95%', mx: 'auto', textAlign: 'center', my: 10 }}>
      <Typography variant="h4" sx={{ color: 'black', mx: '2%', my: 5 }}>
        گوشی بر اساس برند
      </Typography>
      <Box sx={{ display: 'flex' }}>
        {images.map((image, index) => (
          <Box key={index} sx={{ p: 2, width: '30%' }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={`Image ${index + 1}`}
              sx={{ borderRadius: '8px' }}
            />
            <Typography
              sx={{ mt: 1, fontSize: '20px', fontWeight: '900' }}
            >{`${nameBrands[index]}`}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Brands;
