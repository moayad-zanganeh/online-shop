import { Input } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ProductsType } from '@/types/inventory';

const columns = ({ changeInventory, changePrice }: any): GridColDef[] => [
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
      <Input
        type="text"
        sx={{ textAlign: 'center', width: '20%' }}
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
    price: product.price,
  }));
};

export { columns, createRows };
