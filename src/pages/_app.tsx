import { AppProps } from 'next/app';

import GlobalStyle from '../../styles/GlobalStyle';

import { AuthProvider } from '../hooks/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
