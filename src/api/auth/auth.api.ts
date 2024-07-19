import { authType } from '@/types/auth';
import axios from 'axios';

export const fetchAuth = async (user: any) => {
  const res = await axios.post('http://localhost:8000/api/auth/login', user);
  return res;
};
