import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clearCart, getAllItemsOfCart, updateCart } from './card.api';

export const useGetAllCartItems = (id: string) => {
  return useQuery({
    queryFn: () => getAllItemsOfCart(id),
    queryKey: ['allCartItem'],
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCart,
    mutationKey: ['updateItemOfCart'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCartItem'] });
    },
  });
  return updateMutation;
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (id: string) => clearCart(id),
    mutationKey: ['clearCart'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCartItem'] });
    },
  });
  return updateMutation;
};
