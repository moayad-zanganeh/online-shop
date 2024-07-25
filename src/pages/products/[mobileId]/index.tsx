import SingleCard from '@/components/single-card';
import MainLayout from '@/layout';
import { ReactElement } from 'react';

export default function SingleCardPage() {
  return <SingleCard />;
}

SingleCardPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
