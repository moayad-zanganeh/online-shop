import React from 'react';
import Slider from 'react-slick';
import { Box, CardMedia } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://dkstatics-public.digikala.com/digikala-adservice-banners/27a2380685ac70c5f801eeedbab9d28976d96f4b_1709365740.jpg?x-oss-process=image/quality,q_95',
  'https://dkstatics-public.digikala.com/digikala-adservice-banners/d978e93bbe0febd0ab023125ad0f4fe958eb97d3_1711451239.jpg?x-oss-process=image/quality,q_95',
  'https://dkstatics-public.digikala.com/digikala-adservice-banners/5db486a190975797b81ab34ecd9309749d89e546_1714982678.jpg?x-oss-process=image/quality,q_95',
  'https://dkstatics-public.digikala.com/digikala-adservice-banners/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg?x-oss-process=image/quality,q_95',
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function ImageSlider() {
  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <Box key={index} sx={{ p: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={image}
              alt={`Image ${index + 1}`}
              sx={{ borderRadius: '8px', boxShadow: 3 }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
