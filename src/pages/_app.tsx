// src/pages/_app.tsx
import '@/styles/globals.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeContextProvider from '@/context/themContextProvider';
import { CartProvider } from '@/context/cartContext'; // Import CartProvider

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Iransans',
  },
  direction: 'rtl',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
      refetchInterval: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}
