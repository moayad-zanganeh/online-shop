import axios from 'axios';

export const fetchUser = async () => {
  const { data } = await axios.get('http://localhost:8000/api/users');
  return data;
};
