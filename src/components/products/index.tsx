import React, { useState } from 'react';
import Filter from './filter';

import { Box } from '@mui/material';
import Cards from './card';

function Products() {
  const [params, setParams] = useState({});

  return (
    <Box sx={{ display: 'flex', my: '3%' }}>
      <Filter setParams={setParams} />
      <Cards />
    </Box>
  );
}

export default Products;
