import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useFetchProduct } from '@/api/products/products.queris'; // مسیر را بررسی کنید
import DeleteBtn from './delete';

const DataTable: React.FC = () => {
  const { data: productData, error, isLoading } = useFetchProduct();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!productData || !Array.isArray(productData.data.products)) {
    console.error('Invalid product data:', productData);
    return <div>No data available</div>;
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      sortable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'name',
      headerName: 'اسم محصول',
      width: 200,
      sortable: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'photo',
      headerAlign: 'center',
      headerName: 'عکس محصول',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'price',
      headerName: 'قیمت',
      type: 'number',
      width: 150,
      headerAlign: 'center',
      sortable: true,
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
      ),
    },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 250,
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <div style={{ textAlign: 'center', width: '100%', marginRight: '5%' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ padding: 7 }}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          {/* <DeleteBtn id={params.row.id} /> */}
        </div>
      ),
    },
  ];
  const rows = productData.data.products.map((product: any, index: number) => ({
    id: index + 1, // Assuming id is the index for simplicity
    name: product.name,
    photo: product.photo,
    price: product.price,
  }));
  console.log(productData);

  const handleEdit = (id: number) => {
    console.log('Edit row with id:', id);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
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

export default DataTable;
