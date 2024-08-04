import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import {
  useFetchProduct,
  useEditProduct,
} from '@/api/products/products.querys';
import { columns, createRows } from '@/constants/mock-data/inventory';
import { Box, Button } from '@mui/material';
import { Loading } from '@/components/shared/loading';

const PAGE_SIZE_OPTIONS = [5, 10];

const InventoryAndPrice: React.FC = () => {
  const { data: inventory, isLoading } = useFetchProduct();
  const [rowsData, setRowsData] = useState<any[]>([]);

  const { mutate: editProduct } = useEditProduct();

  const changeInventory = (id: string, value: string) => {
    setRowsData((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, inventory: value } : row
      )
    );
  };

  const changePrice = (id: string, value: string) => {
    setRowsData((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, price: value } : row))
    );
  };

  const handleSaveChanges = () => {
    rowsData.forEach((row) => {
      const updatedProduct = {
        inventory: row.inventory,
        price: row.price,
      };
    });
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Button onClick={handleSaveChanges}>ثبت تغییرات</Button>
      {!isLoading ? (
        <DataGrid
          rows={rowsData}
          columns={columns({ changeInventory, changePrice })}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          checkboxSelection
        />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default InventoryAndPrice;
