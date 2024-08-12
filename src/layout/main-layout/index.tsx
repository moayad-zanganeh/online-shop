import { ReactNode, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Footer from './footer';
import Header from './header';
import { useUserStore } from '@/store/useUser';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box>
          <Header user={user} />
          {children}
          <Footer />
        </Box>
      )}
    </Box>
  );
}
