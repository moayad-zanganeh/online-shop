import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useFetchProduct } from '@/api/products/products.queris';
const { data, error } = useFetchProduct();
console.log(data);
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

// const rows = inventory?.map((item: any) => ({
//   id: item.id,
//   name: item.name,
//   inventory: item.inventory,
//   price: item.price,
// }));

export default function InventoryAndPrice() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        // rows={rows}
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
}
