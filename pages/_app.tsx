import {SessionProvider} from 'next-auth/react';
import Layout from '../components/Layout/layout';

import type {Session} from 'next-auth';
import type {AppProps} from 'next/app';
import {SnackbarProvider} from '../hooks/useSnackBar';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider>
        <Layout>
            <Component {...pageProps} />
          </Layout>
      </SnackbarProvider>
    </SessionProvider>
  );
}