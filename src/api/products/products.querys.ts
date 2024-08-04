import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
  fetchProductById,
  fetchProductFilter,
  fetchSingleProduct,
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

// export const useEditProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ['edit-product'],
//     mutationFn: ({ id, productData }: { id: string; productData: any }) =>
//       editProduct(id, productData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['all-products'] });
//     },
//     onError: (error) => {
//       console.error('Error editing product:', error);
//     },
//   });
// };

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
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-products'],
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-products'] });
    },
  });
};

export const useFetchSingleProduct = (productId: string) => {
  const res = useQuery({
    queryFn: () => fetchSingleProduct(productId),
    queryKey: ['productId', productId],
  });
  return res;
};
