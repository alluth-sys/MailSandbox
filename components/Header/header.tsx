import Button from '@mui/material/Button';
import {signIn, signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <header>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn(
                  'azure-ad',
                  { callbackUrl: '/' },
                  { prompt: 'login' },
                  );
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                ></span>
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: '/' });
                }}
              >
                {' '}
                Sign Out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href='/' passHref>
              <Button variant='text'>
                Home
              </Button>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/doc-scan'>
            <Button variant='text'>
                Document Scan
            </Button>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/mail-scan'>
            <Button variant='text'>
                Mail Scan
            </Button>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/task/mail' passHref>
            <Button variant='text'>
                Task
            </Button>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/admin' passHref>
            <Button variant='text'>
                Admin
            </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}