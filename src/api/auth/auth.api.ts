import { authType } from '@/types/auth';
import axios from 'axios';

export const fetchLogin = async (user: any) => {
  const res = await axios.post('http://localhost:8000/api/auth/login', user);
  return res.data;
};

export const fetchSignUP = async (user: any) => {
  const res = await axios.post('http://localhost:8000/api/auth/signup', user);
  return res.data;
};
