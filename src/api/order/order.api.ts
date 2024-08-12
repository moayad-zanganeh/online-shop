import { OrderType } from '@/types/order';
import axios from 'axios';

export const getAllOrders = async () => {
  const response = await axios.get(`http://localhost:8000/api/orders`);
  return response.data;
};

export const addNewOrders = async (data: OrderType) => {
  const response = await axios.post(`http://localhost:8000/api/orders`, data);
  return response.data;
};

export const getOrdersById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/api/orders/${id}`);
  return response.data;
};

export const editOrderById = async (id: string) => {
  const response = await axios.patch(`http://localhost:8000/api/orders/${id}`);
  return response.data;
};

export const removeOrderById = async (id: string) => {
  const response = await axios.delete(`http://localhost:8000/api/orders/${id}`);
  return response.data;
};
