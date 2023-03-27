import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Global, ThemeProvider } from '@emotion/react';
import theme from 'theme';
import global from 'global';

const { NEXT_PUBLIC_API_MOCKING } = process.env;

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState<boolean>(
    !NEXT_PUBLIC_API_MOCKING
  );
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  useEffect(() => {
    async function initMocks() {
      const { setupMocks } = await import('mocks');
      await setupMocks();
      setShouldRender(true);
    }

    if (NEXT_PUBLIC_API_MOCKING === 'enabled') {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Global styles={global} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
