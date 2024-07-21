import React from 'react';
import ImageSlider from './slider';
import { Box } from '@mui/material';
import BestSellers from './best-sellers';

function MainBar() {
  return (
    <Box>
      <ImageSlider />
      <BestSellers />
    </Box>
  );
}

export default MainBar;
