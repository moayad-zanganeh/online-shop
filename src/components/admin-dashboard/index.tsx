import React from 'react';
import HeaderAadminDashboard from './header-admin-dashboard';
import { Box } from '@mui/material';
import Table from './table';

function AadminDashboard() {
  return (
    <Box>
      <HeaderAadminDashboard />
      <Table />
    </Box>
  );
}

export default AadminDashboard;
