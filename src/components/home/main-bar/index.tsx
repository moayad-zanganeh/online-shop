import React from 'react';
import ImageSlider from './slider';
import { Box } from '@mui/material';
import BestSellers from './best-sellers';
import Brands from './brands';

function MainBar() {
  return (
    <Box>
      <ImageSlider />
      <BestSellers />
      <Brands />
    </Box>
  );
}

export default MainBar;
