import Image from 'next/image';
import logo from '../../public/iii-logo.png';
import styles from '../Footer/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <strong className={styles.text}>A Project Powered by</strong>
      <Image 
        src={logo} 
        alt='iii-logo'
        width={150}
        height={30}
        priority
        ></Image>
    </footer>
    
  );
}