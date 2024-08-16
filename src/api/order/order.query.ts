import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addNewOrders,
  editOrderById,
  getAllOrders,
  getOrdersById,
} from './order.api';

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
  });
};

export const useAddNewOrders = () => {
  return useMutation({
    mutationKey: ['newOrders'],
    mutationFn: addNewOrders,
  });
};

export const useGetOrdersById = (id: string) => {
  return useQuery({
    queryKey: ['OrdersById'],
    queryFn: () => getOrdersById(id),
    enabled: !!id,
  });
};

export const useEditOrderById = () => {
  return useMutation({
    mutationKey: ['editOrders'],
    mutationFn: (id: string) => editOrderById(id),
  });
};
