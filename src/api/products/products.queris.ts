import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from './products.api';

export const useFetchProduct = () => {
  const res = useQuery({
    queryFn: fetchProduct,
    queryKey: ['all-products'],
  });
  return res;
};
