import { useQuery } from '@tanstack/react-query';
import { productsApi } from './products.api';

export const useGetProducts = () => {
  return useQuery({ queryKey: ['all-products'], queryFn: productsApi });
};
