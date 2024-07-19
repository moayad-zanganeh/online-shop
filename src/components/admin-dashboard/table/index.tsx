import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteBtn from './delete';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, sortable: true },
  { field: 'name', headerName: 'اسم محصول', width: 250, sortable: true },
  { field: 'photo', headerName: 'عکس محصول', width: 100, sortable: true },
  {
    field: 'price',
    headerName: 'قیمت',
    type: 'number',
    width: 90,
    sortable: true,
    renderCell: (params) => (
      <div style={{ textAlign: 'center', width: '100%' }}>{params.value}</div>
    ),
  },
  {
    field: 'actions',
    headerName: 'عملیات',
    width: 250,
    sortable: false,
    renderCell: (params) => (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ padding: 7 }}
          onClick={() => handleEdit(params.row.id)}
        >
          Edit
        </Button>
        <DeleteBtn id={params.row.id} />
      </div>
    ),
  },
];

const rows = [
  { id: 1, name: 'Snow', photo: 'Jon', price: 35 },
  { id: 2, name: 'Lannister', photo: 'Cersei', price: 42 },
  { id: 3, name: 'Lannister', photo: 'Jaime', price: 45 },
  { id: 4, name: 'Stark', photo: 'Arya', price: 16 },
  { id: 5, name: 'Targaryen', photo: 'Daenerys', price: null },
  { id: 6, name: 'Melisandre', photo: null, price: 150 },
  { id: 7, name: 'Clifford', photo: 'Ferrara', price: 44 },
  { id: 8, name: 'Frances', photo: 'Rossini', price: 36 },
  { id: 9, name: 'Roxie', photo: 'Harvey', price: 65 },
];

const handleEdit = (id: number) => {
  console.log('Edit row with id:', id);
};

export default function DataTable() {
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
}
