import React, { useState } from 'react';
import Filter from './filter';
import Cards from './card';
import { Box } from '@mui/material';

const ParentComponent = () => {
  const [params, setParams] = useState<Record<string, string>>({});

  return (
    <Box sx={{ display: 'flex', my: 5 }}>
      <Filter setParams={setParams} />
      <Cards filterParams={params} />
    </Box>
  );
};

export default ParentComponent;
