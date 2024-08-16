import axios from 'axios';

export const fetchProduct = async () => {
  const { data } = await axios.get(
    'http://localhost:8000/api/products?limit=all'
  );
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
  
  return data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(
    `http://localhost:8000/api/products/${id}`
  );
  return response.data;
};

export const editProduct = async ({
  id,
  productData,
}: {
  id: string;
  productData: any;
}) => {
  const res = await axios.patch(
    `http://localhost:8000/api/products/${id}`,
    productData
  );
  return res.data;
};

export const addProduct = async (data: any) => {
  const res = await axios.post('http://localhost:8000/api/products', data);
  return res.data;
};

export const fetchSingleProduct = async (productId: string) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/products/${productId}`
  );
  return data;
};
