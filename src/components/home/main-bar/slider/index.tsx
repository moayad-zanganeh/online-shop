import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const images = [
  '/images/5db486a190975797b81ab34ecd9309749d89e546_1714982678.jpg',
  '/images/0933af3c46fa1eee9cc8d13c1f9c6d84999db3d6_1706601234.jpg',
  '/images/27a2380685ac70c5f801eeedbab9d28976d96f4b_1709365740.jpg',
  '/images/d978e93bbe0febd0ab023125ad0f4fe958eb97d3_1711451239.jpg',
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
    <Box sx={{ width: '100%', height: '100%', mx: 'auto' }}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              height: '70vh',
              position: 'relative',
            }}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
