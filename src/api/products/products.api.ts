import axios from 'axios';

export const productsApi = async () => {
  const res = await axios.get('http://localhost:8000/api/products');
  console.log(res);
  return res;
};
