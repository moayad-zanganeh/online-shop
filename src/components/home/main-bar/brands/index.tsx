import { brandsMobile } from '@/constants/localization';
import { Box, CardMedia, Typography } from '@mui/material';

const images = [
  '/images/honor.jpg',
  '/images/iphone.png',
  '/images/samsung.png',
  '/images/xiaomi.png',
];
const nameBrands = [
  brandsMobile.honor,
  brandsMobile.apple,
  brandsMobile.sumsung,
  brandsMobile.xiaomi,
];

function Brands() {
  return (
    <Box sx={{ width: '95%', mx: 'auto', textAlign: 'center', my: 10 }}>
      <Typography variant="h4" sx={{ color: 'black', mx: '2%', my: 5 }}>
        {brandsMobile.phoneBrand}{' '}
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
