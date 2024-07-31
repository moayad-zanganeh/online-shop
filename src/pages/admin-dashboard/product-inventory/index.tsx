import InventoryAndPrice from '@/components/admin-dashboard/Inventory-and-price';
import React from 'react';
import AdminLayout from '@/layout/admin-layout';
import { ReactElement } from 'react';

export default function InventoryAndPricePage() {
  return <InventoryAndPrice />;
}
InventoryAndPricePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
