import React from 'react';
import Slider from 'react-slick';
import { Box, CardMedia } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const images = [
  '/images/5db486a190975797b81ab34ecd9309749d89e546_1714982678.jpg',
  '/images/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg',
  '/images/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg',
  '/images/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg',
  '/images/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg',
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
    <Box sx={{ width: '97%', mx: 'auto' }}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <Image
            key={index}
            height="600"
            src={image}
            alt={`Image ${index + 1}`}
            width={2880}
            style={{ borderRadius: '8px' }}
          />
        ))}
      </Slider>
    </Box>
  );
}
