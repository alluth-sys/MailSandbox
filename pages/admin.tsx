import {useSession} from 'next-auth/react';
import AccessDenied from '../components/AccessDenied/access-denied';

export default function Page() {
  const { data: session } = useSession();
  
  if (!session) {
    return (
        <AccessDenied />
    );
  }

  return (
    <>
      <h1>Admin Page</h1>
      <h2>Welcome, {session.user?.name}!</h2>
    </>
  );
}