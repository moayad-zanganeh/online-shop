import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './user.api';

export const useFetchUser = () => {
  const res = useQuery({
    queryFn: fetchUser,
    queryKey: ['all-user'],
  });
  return res;
};
