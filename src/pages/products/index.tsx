import Products from '@/components/products';
import MainLayout from '@/layout/main-layout';
import { ReactElement } from 'react';

export default function ProductsPage() {
  return <Products />;
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
