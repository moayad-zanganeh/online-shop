import axios from 'axios';

export const fetchProduct = async () => {
  const { data } = await axios.get('http://localhost:8000/api/products');
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
  console.log(data);
  return data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(
    `http://localhost:8000/api/products/${id}`
  );
  return response.data;
};

export const editProduct = async (id: string, productData: any) => {
  const res = await axios.patch(
    `http://localhost:8000/api/products/${id}`,
    productData
  );
  return res.data;
};

export const addProduct = async () => {
  const res = await axios.post('http://localhost:8000/api/products');
  return res;
};

export const fetchSingleProduct = async (productId: string) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/products/${productId}`
  );
  return data;
};
