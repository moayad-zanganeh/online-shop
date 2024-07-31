import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteProduct,
  editProduct,
  fetchProduct,
  fetchProductById,
} from './products.api';

export const useFetchProduct = () => {
  const res = useQuery({
    queryFn: fetchProduct,
    queryKey: ['all-products'],
  });
  return res;
};

export const useFetchProductById = (id: string) => {
  const res = useQuery({
    queryFn: () => fetchProductById(id),
    queryKey: ['id', id],
  });
  return res;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete'],
    mutationFn: deleteProduct,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ['all-products'] });
    },
    onError: (res) => {
      queryClient.invalidateQueries({ queryKey: ['all-products'] });
      console.log(res);
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['edit-product'],
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-products'] });
    },
    onError: (error) => {
      console.error('Error editing product:', error);
      // Optionally show an error message to the user
    },
  });
};
