// delet , path, pst => use mutaion
//get => useQuery

import { useMutation } from '@tanstack/react-query';
import { fetchLogin, fetchSignUP } from './auth.api';

export const useFetchLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: fetchLogin,
  });
};

export const useFetchSignUp = () => {
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: fetchSignUP,
  });
};
