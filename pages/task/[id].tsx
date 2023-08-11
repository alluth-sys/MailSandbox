import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

interface ResultResponse {
    filename: string,
    violations: string[],
}

export default function TaskDetail() {
    const router = useRouter()
    const [results, setResults] = useState<ResultResponse[]>();

    useEffect(()=>{
        console.log(router.query.id)
        if(!router.query.id) return
        axios.get(`http://localhost:8777/showResult?taskID=${router.query.id}`).then((res)=>{
            if(res.statusText !== 'OK') return;
            console.log(res)
            setResults(res.data);
        });
    },[router.query.id])

  return (
    <>
        <div>{router.query.id}</div>
        <div>
            {results?.map((v,i)=>{
                return(
                    <div key={i} >
                        {v.filename}
                            {v.violations.map((item,j)=>{
                                return (<li key={j}>{item}</li>)
                            })}
                        
                    </div>
                )
            })}
        </div>
    </>
    

  )
}
