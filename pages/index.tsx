import Footer from '@/components/Footer/footer';
import Head from 'next/head';
import Image from 'next/image';
import logo from '../public/kowala-logo.png';
import styles from '../styles/Home.module.css';

export default function IndexPage() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Kowala Malware</title>
        </Head>
        <main className={styles.main}>
          <Image
            src={logo}
            alt='logo'
            className={styles.logo}
          ></Image>
          <h1>Kowala Malware App</h1>
          <h4>
            A Sandbox System to detect malware
          </h4>
        </main>
        <Footer/>
      </div>
  );
}