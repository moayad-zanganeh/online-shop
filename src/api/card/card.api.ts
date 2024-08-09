import axios from 'axios';
import { getCookie } from 'cookies-next';

export const getAllItemsOfCart = async (id: string) => {
  const res = await axios.get(`http://localhost:8000/api/users/${id}`, {
    headers: { Authorization: `Bearer ${getCookie('token')}` },
  });
  return res.data.cart;
};

export const updateCart = async (data: any) => {
  const res = await axios.patch(
    `http://localhost:8000/api/users/${data.id}`,
    {
      cart: data.cart,
    },
    {
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    }
  );
  return res;
};

export const clearCart = async (id: string) => {
  const res = await axios.patch(
    `http://localhost:8000/api/users/${id}`,
    {
      cart: [],
    },
    {
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    }
  );
  return res;
};
