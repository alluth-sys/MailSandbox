import PageNavigator from "@/components/PageNavigator/page-navigator";
import ProgressSpinner from "@/components/ProgressSpinner/ProgressSpinner";
import {useSnackbar} from "@/hooks/useSnackBar";
import RefreshIcon from '@mui/icons-material/Refresh';
import {Button, LinearProgress} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios, {AxiosError} from "axios";
import moment from "moment-timezone";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import styles from '../../../styles/Task.module.css';

interface TaskResponse{
  id: string,
  filename: string,
  status: string,
  createTime: string
}

const TaskStatuses = ['init','finish_static_report','start_generating_shot','start_dynamic_analysis','start_generating_aftershot',
                        'start_processing_file','generating_report','report_upload_success']

export default function Document() {
  const [refreshKey, setRefereshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const [tasks, setTasks] = useState<TaskResponse[]>()
  const showSnackbar = useSnackbar();

  useEffect(()=>{
      if(!data) return;
      setLoading(true);
      axios.get(`http://localhost:8777/getTaskStatus`)
      .then((res)=>{
          if(res.statusText !== 'OK') return;
          setTasks(res.data);
          setLoading(false);
      })
      .catch((e: AxiosError) => {
        setLoading(false)
          showSnackbar(e.message)
      });

  },[refreshKey, data, showSnackbar])

  const onRefresh = () =>{
      setRefereshKey((prev)=> prev+1);
  }

  const checkIsTaskFinished = (state:string) => {
        if(state !== 'report_upload_success') return false;
        return true;
  }

  const getProgress = (state:string) => {
        if (TaskStatuses.indexOf(state) === -1) return 0;

        return ((TaskStatuses.indexOf(state)+1)/8)*100
  }

  function capitalizeEveryWord(str: string): string {
    return str.split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
}

  return (
    <div>
        <PageNavigator/>
        {loading && <LinearProgress/>}
        <TableContainer>
            <Table className={styles['task-table']} aria-label="tasks table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>File Name</strong></TableCell>
                        <TableCell><strong>Created At</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                        <TableCell >
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
                          key={task.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          hover={true}
                          >
                              <TableCell component="th" scope="row">
                              {task.filename}
                              </TableCell>
                              <TableCell>{moment.utc(task.createTime).tz("Asia/Taipei").format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                              <TableCell>
                              <Button variant="contained" disabled={!checkIsTaskFinished(task.status)}>
                                        <Link 
                                            href={`/task/document/${task.id}`} 
                                            passHref 
                                            style={{ textDecoration: 'none', color:'white' }}
                                        >
                                        View
                                        </Link>
                                      </Button>
                              </TableCell>
                              <TableCell align="justify">
                                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                                    {capitalizeEveryWord(task.status)}
                                    <ProgressSpinner value={getProgress(task.status)}/>
                                </div>
                                
                                </TableCell>
                             
                          </TableRow>
                      ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
