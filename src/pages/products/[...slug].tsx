import SingleCard from '@/components/single-card';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '@/layout/main-layout';

export function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <Typography>Not Found</Typography>;
  }

  return <>{slug.length === 1 ? <SingleCard productId={slug[0]} /> : null}</>;
}

export default function SingleCardPage() {
  const router = useRouter();
  const { slug } = router.query;

  return slug && slug.length === 1 ? (
    <SingleCard productId={slug[0]} />
  ) : (
    <Typography>Not Found</Typography>
  );
}

SingleCardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
