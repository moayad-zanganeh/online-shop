import { useFetchProductById } from '@/api/products/products.querys';
import { messageLocalization } from '@/constants/localization';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function SingleCard() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();
  const { data, isLoading } = useFetchProductById(
    router.query.productId as string
  );
  const [modal, setModal] = useState({
    isOpen: false,
    message: messageLocalization.successful,
  });
  return (
    <Box sx={{ m: 5 }}>
      <Box></Box>
    </Box>
  );
}

export default SingleCard;
