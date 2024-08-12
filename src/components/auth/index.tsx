import SignIn from '@/components/auth/sign-in';
import SignUp from '@/components/auth/sign-up';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const { action } = router.query;

  const setSearchParams = (params: any) => {
    router.push({
      pathname: router.pathname,
      query: params,
    });
  };

  return action === 'signup' ? (
    <SignUp setSearchParams={setSearchParams} />
  ) : (
    <SignIn setSearchParams={setSearchParams} />
  );
};

export default Auth;
