import {SessionProvider} from 'next-auth/react';
import Layout from '../components/Layout/layout';

import type {Session} from 'next-auth';
import type {AppProps} from 'next/app';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>
  );
}