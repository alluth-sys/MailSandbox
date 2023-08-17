import {useSnackbar} from '@/hooks/useSnackBar';
import axios, {AxiosError} from 'axios';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import AccessDenied from '../components/AccessDenied/access-denied';
import styles from '../styles/Admin.module.css';

export default function Page() {
  const { data, status } = useSession();
  const unauthenticated = status === 'unauthenticated';
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<microsoftgraph.User>();
  const showSnackbar = useSnackbar();

  useEffect(()=>{
    if(!data || unauthenticated) return
    setLoading(true)
    axios.get("https://graph.microsoft.com/v1.0/me",{
      headers:{Authorization:`Bearer ${data.accessToken}`},
    })
    .then((res)=>{
      if(res.statusText !== 'OK') return;
      setUserData(res.data)
    })
    .catch((e: AxiosError)=>{
      showSnackbar(e.message)
      setLoading(false);
    })
  },[data, unauthenticated])
  
  if (!data) {
    return (
        <AccessDenied />
    );
  }

  return (
    <>
      <h2>Welcome, {data.user?.name}!</h2>
      <div className={styles.card}>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
      
    </>
  );
}