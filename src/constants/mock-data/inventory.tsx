import { Box, Input } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ProductsType } from '@/types/inventory';

const columns = ({ changeInventory, changePrice }: any): GridColDef[] => [
  {
    field: 'name',
    headerName: 'اسم محصول',
    width: 550,
    sortable: true,
    headerAlign: 'center',
    renderCell: (params) => <Box style={{ width: '100%' }}>{params.value}</Box>,
  },
  {
    field: 'inventory',
    headerName: 'موجودی',
    width: 250,
    sortable: true,
    headerAlign: 'center',
    renderCell: (params) => (
      <Input
        type="text"
        sx={{ textAlign: 'center', width: '30%', mx: 10 }}
        value={params.value}
        onChange={(e) => changeInventory(params.id, e.target.value)}
      />
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
      <Input
        type="text"
        sx={{ textAlign: 'center', width: '100%' }}
        value={params.value}
        onChange={(e) => changePrice(params.id, e.target.value)}
      />
    ),
  },
];

const createRows = (inventory: ProductsType) => {
  return inventory?.data?.products?.map((product, index: number) => ({
    id: index,
    name: product.name,
    inventory: product.quantity,
    price: product.price.toLocaleString(),
  }));
};

export { columns, createRows };
