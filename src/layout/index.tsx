import { ReactNode, useEffect, useState } from 'react';
import Footer from './footer';
import Header from './header';
import { Box, CircularProgress } from '@mui/material';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

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
          <Header />

          <main>{children}</main>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
