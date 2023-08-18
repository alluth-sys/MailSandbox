import PageNavigator from '@/components/PageNavigator/page-navigator';
import {useSnackbar} from '@/hooks/useSnackBar';
import DoneIcon from '@mui/icons-material/Done';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Button} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios, {AxiosError} from "axios";
import moment from "moment-timezone";
import {useSession} from "next-auth/react";
import Link from 'next/link';
import {useEffect, useState} from "react";
import styles from '../../../styles/Task.module.css';

interface TaskResponse{
    taskID: string,
    isFinish: boolean,
    subjects: string[],
    createdTime: string,
}

export default function Task() {
    const [refreshKey, setRefereshKey] = useState(0);
    const { data } = useSession();
    const [tasks, setTasks] = useState<TaskResponse[]>()
    const showSnackbar = useSnackbar();

    useEffect(()=>{
        if(!data) return;
        axios.get(`http://localhost:8777/checkTask?userID=${data.user.email}`)
        .then((res)=>{
            if(res.statusText !== 'OK') return;
            setTasks(res.data);
        })
        .catch((e: AxiosError) => {
            showSnackbar(e.message)
        });

    },[refreshKey, data, showSnackbar])

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
                <div>
                    <CircularProgress style={{color:'orange'}} size={"1.5rem"}/>
                </div>
        )

    }

    const joinArray = (subjects: string[]) => {
        if(!subjects) return;
        return subjects.join(', ')
    }

  return (
    <div>
        <PageNavigator/>
        <TableContainer>
            <Table className={styles['task-table']} aria-label="tasks table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Task ID</strong></TableCell>
                        <TableCell><strong>Created At</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
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
                        hover={true}
                        >
                            <TableCell component="th" scope="row" >
                            {`${task.subjects.length}個文件` + `, 任務序號：${task.taskID.split('-')[0].toUpperCase()}`}
                            </TableCell>
                           
                            <TableCell>{moment.utc(task.createdTime).tz("Asia/Taipei").format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                            <TableCell>
                            <Button variant="contained" disabled={!task.isFinish}>
                                <Link href={`/task/mail/${task.taskID}`} passHref style={{ textDecoration: 'none', color:'white' }}>
                                        View
                                </Link>
                            </Button>
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


