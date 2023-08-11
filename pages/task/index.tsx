import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Button} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import {useSession} from "next-auth/react";
import Link from 'next/link';
import {useEffect, useState} from "react";
import styles from '../../styles/Task.module.css';

interface TaskResponse{
    taskID: string,
    isFinish: boolean
}

export default function Task() {
    const [refreshKey, setRefereshKey] = useState(0);
    const { data, status } = useSession();
    const [tasks, setTasks] = useState<TaskResponse[]>()
    useEffect(()=>{
        if(!data) return;
        axios.get(`http://localhost:8777/checkTask?userID=${data.user.email}`).then((res)=>{
            if(res.statusText !== 'OK') return;
            setTasks(res.data);
        });

    },[refreshKey, data])

    const onRefresh = () =>{
        setRefereshKey((prev)=> prev+1);
    }

    const checkStatus = (status: boolean) => {
        if(status){
            return(
                    <div className={styles.cell}>
                        <DoneIcon/>
                    </div>
            )
        }

        return(
                <div className={styles['cell-load']}>
                    <HourglassBottomIcon/>
                </div>
        )

    }

  return (
    <div>
        <TableContainer>
            <Table className={styles['task-table']} aria-label="tasks table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Task ID</strong></TableCell>
                        <TableCell>
                            <strong>Status</strong> 
                            <Button onClick={onRefresh}>
                                <RefreshIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks && tasks.map((task) => (
                        <TableRow
                        key={task.taskID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        hover={true}
                        >
                            <TableCell component="th" scope="row">
                                <Link href={`/task/${task.taskID}`} passHref style={{ textDecoration: 'none', color:'black' }}>
                                    {task.taskID.toUpperCase()}
                                </Link>
                            </TableCell>
                            <TableCell>{checkStatus(task.isFinish)}</TableCell>
                        </TableRow>
                    ))}
        </TableBody>
            </Table>
        </TableContainer>
        </div>
  )
}


// {tasks?.map((v)=>{
//     return (
//         <Link key={v.taskID} href={`/task/${v.taskID}`} passHref>
//             <li>
//                 {v.taskID} 
//             </li>
//         </Link>
//     )
// })}