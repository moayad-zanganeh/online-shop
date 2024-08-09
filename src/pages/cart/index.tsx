import CartPage from '@/components/cart';
import MainLayout from '@/layout/main-layout';
import { ReactElement } from 'react';

export default function Cart() {
  return <CartPage />;
}

Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
