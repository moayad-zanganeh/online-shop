import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFetchProduct } from '@/api/products/products.queris';
import HeaderAadminDashboard from '../header-admin-dashboard';

const InventoryAndPrice: React.FC = () => {
  const { data: inventory, error, isLoading } = useFetchProduct();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!inventory || !Array.isArray(inventory.data.products)) {
    console.error('Invalid inventory data:', inventory);
    return <div>No data available</div>;
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'اسم محصول',
      width: 100,
      sortable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'inventory',
      headerName: 'موجودی',
      width: 250,
      sortable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'price',
      headerName: 'قیمت',
      type: 'number',
      width: 90,
      headerAlign: 'center',
      sortable: true,
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
  ];

  const rows = inventory.data.products.map((product: any, index: number) => ({
    id: index,
    name: product.name,
    inventory: product.quantity,
    price: product.price,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <HeaderAadminDashboard />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default InventoryAndPrice;
