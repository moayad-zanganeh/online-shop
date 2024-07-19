import axios from 'axios';

export const fetchProduct = async () => {
  const { data } = await axios.get('http://localhost:8000/api/products');
  return data;
};
