import {useSnackbar} from '@/hooks/useSnackBar';
import ArticleIcon from '@mui/icons-material/Article';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import {Paper} from '@mui/material';
import axios, {AxiosError} from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styles from '../../../styles/Task.module.css';

interface ResultResponse {
    filename: string,
    violations: string[],
}

export default function TaskDetail() {
    const router = useRouter()
    const [results, setResults] = useState<ResultResponse[]>();
    const showSnackbar = useSnackbar();

    useEffect(()=>{
        if(!router.query.id) return
        axios.get(`http://localhost:8777/showResult?taskID=${router.query.id}`)
        .then((res)=>{
            if(res.statusText !== 'OK') return;
            setResults(res.data);
        })
        .catch((e:AxiosError)=>{
            showSnackbar(e.message);
        });
    },[router.query.id, showSnackbar])

  return (
    <div style={{width:"100%", display:"flex", justifyContent:"center"}}>  
        <Paper className={styles['report-card']}>
            <h3>Generated Report</h3>
            <div style={{marginBottom:"0.5rem", color:"gray", fontSize:"small"}}>
                {`Last updated: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`}
            </div>
            <div>
            {results?.map((v,i)=>{
                return(
                    <Paper key={i} elevation={2} className={styles['report-list']}>
                        <span className={styles['file-list']}>
                            <ArticleIcon className={styles['file-icon']}/>
                            {v.filename}
                        </span>
                        <div style={{color:"#ff6b6b", display:"flex", alignItems:"center", marginTop:"0.5rem"}}>
                            <CrisisAlertIcon />
                            <strong>Violated Rules:</strong>
                            
                        </div>
                            {v.violations.length !== 0 ? v.violations.map((item,j)=>{
                                return (
                                    <li key={j}>
                                        {item}
                                    </li>  
                                )
                            }):
                            <div>
                                None
                            </div>
                            }
                        
                    </Paper>
                )
            })}
        </div>
        </Paper>  
    </div>
  )
}
