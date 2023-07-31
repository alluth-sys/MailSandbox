import {ReactNode} from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}