import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import theme from 'theme';
import global from 'global';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
