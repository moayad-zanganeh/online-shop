// delet , path, pst => use mutaion
//get => useQuery

import { useMutation } from '@tanstack/react-query';
import { fetchLogin, fetchSignUP } from './auth.api';
import { useUserStore } from '@/store/useUser';
import { useRouter } from 'next/router';

export const useFetchLogin = () => {
  const { setUserData } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      const userData = data.data.user;
      setUserData(userData);
    },
  });
};

export const useFetchSignUp = () => {
  const { setUserData } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: fetchSignUP,
    onSuccess: (data) => {
      const userData = data.data.user;
      setUserData(userData);
    },
  });
};
