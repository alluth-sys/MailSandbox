import PageNavigator from "@/components/PageNavigator/page-navigator";
import {useSnackbar} from "@/hooks/useSnackBar";
import RefreshIcon from '@mui/icons-material/Refresh';
import {Button} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios, {AxiosError} from "axios";
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

export default function Document() {
  const [refreshKey, setRefereshKey] = useState(0);
  const { data } = useSession();
  const [tasks, setTasks] = useState<TaskResponse[]>()
  const showSnackbar = useSnackbar();

  useEffect(()=>{
      if(!data) return;
      axios.get(`http://localhost:8777/getTaskStatus`)
      .then((res)=>{
          if(res.statusText !== 'OK') return;
          console.log(res.data)
          setTasks(res.data);
      })
      .catch((e: AxiosError) => {
          showSnackbar(e.message)
      });

  },[refreshKey, data, showSnackbar])

  const onRefresh = () =>{
      setRefereshKey((prev)=> prev+1);
  }

  return (
    <div>
        <PageNavigator/>
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
                          key={task.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          hover={true}
                          >
                              <TableCell component="th" scope="row">
                                  <Link href={`/task/document/${task.id}`} passHref style={{ textDecoration: 'none', color:'black' }}>
                                      {task.id.toUpperCase()}
                                  </Link>
                              </TableCell>
                              <TableCell>{task.status}</TableCell>
                          </TableRow>
                      ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
