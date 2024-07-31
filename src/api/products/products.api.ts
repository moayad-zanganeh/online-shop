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

export const editProduct = async (productData: any) => {
  const { id, ...rest } = productData;
  const res = await axios.patch(
    `http://localhost:8000/api/products/${id}`,
    rest
  );
  return res.data;
};
