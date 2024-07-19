// delet , path, pst => use mutaion
//get => useQuery

import { useMutation } from '@tanstack/react-query';
import { fetchAuth } from './auth.api';

export const useFetchAuth = () => {
  return useMutation({
    mutationKey: ['auth'],
    mutationFn: fetchAuth,
  });
};
