import {useSession} from 'next-auth/react';

export default function ReminderPage() {
  const { data } = useSession();

  return (
    <>
      <h1>Reminder Page</h1>
      <p>Only admin users can see this page.</p>
    </>
  );
}