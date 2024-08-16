import React, { useEffect, useState } from 'react';
import Filter from './filter';
import Cards from './card';
import { Box } from '@mui/material';
import { Loading } from '../shared/loading';

const ParentComponent = () => {
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ display: 'flex', my: 5 }}>
          <Filter setParams={setParams} />
          <Cards filterParams={params} />
        </Box>
      )}
    </Box>
  );
};

export default ParentComponent;
