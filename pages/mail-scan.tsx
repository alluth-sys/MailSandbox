import AccessDenied from "@/components/AccessDenied/access-denied";
import {useSnackbar} from "@/hooks/useSnackBar";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import RadarIcon from '@mui/icons-material/Radar';
import {Button} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';
import axios, {AxiosError} from 'axios';
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import styles from '../styles/MailScan.module.css';

interface Task{
  taskID: string;
  userID: string;
  token: string;
  message_list: string[];
}


export default function MailScan() {
  const { data, status } = useSession();
  const [mailData, setData] = useState<MicrosoftGraph.Message[]>();
  const unauthenticated = status === 'unauthenticated';

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [checkedMail, setCheckedMail] = useState<string[]>([]);
  const label = { inputProps: { 'aria-label': 'mail-check' } };
  const showSnackbar = useSnackbar();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const checkMailHasBeenChecked = (id:string|undefined) =>{
    if(!id) return;
    return checkedMail?.indexOf(id) === -1 ? false : true;
  }

  const handleCheckChange = (id:string|undefined) =>{
    if(!id) return;

    const indx = checkedMail?.indexOf(id);
    if(indx !== -1){
      var array = [...checkedMail];
      array.splice(indx, 1);
      setCheckedMail(array);
    }
    else{
      setCheckedMail(current => [...current, id])
    }
  }

  const onScan = () =>{
    if(!data) return;

    const payload: Task = {
      taskID: uuidv4(),
      userID: data.user.email,
      token: data.accessToken,
      message_list: checkedMail,
    }

    axios.post("http://localhost:8777/task",{
      ...payload,
    }).then((res)=>{
      if(res.statusText !== 'OK') return;
      showSnackbar(`Successfully created task ${res.data.taskID}`)
    }).catch((e)=>{
      showSnackbar(e);
    })
  }
  
  useEffect(()=>{
    if(!data || unauthenticated) return
    setLoading(true)
    axios.get("https://graph.microsoft.com/v1.0/me/messages",{
      headers:{Authorization:`Bearer ${data.accessToken}`},
      params:{
        count: true,
        top: rowsPerPage,
        skip: page * 10,
        filter: "hasAttachments eq true",
      }
    })
    .then((res)=>{
      if(res.statusText !== 'OK') return;
      setData(res.data.value)
      setCount(res.data["@odata.count"])
      setLoading(false);
    })
    .catch((e: AxiosError)=>{
      showSnackbar(e.message)
      setLoading(false);
    })
  },[data, unauthenticated, rowsPerPage, page])

  if (!data) {
    return (
        <AccessDenied />
    );
  }

  return (
    <div>
      {mailData && 
        <div className={styles.container}>
          {mailData.map((value)=>{
            return (
            <div key={value.id} className={styles.card}>
              <Checkbox {...label} 
                checked={checkMailHasBeenChecked(value.id)}
                onChange={()=>{
                  handleCheckChange(value.id);
                }}
              />
              <div className={styles['mail-item']}>
                <div>
                  <strong>Subject: </strong>{value.subject ?? 'No Subject'}
                </div>
                <div className={styles['source-list']}>
                <strong>Source: </strong>{value.sender?.emailAddress?.name} on {value.createdDateTime?.split('T')[0]}
                </div>
              </div>
            </div>
            )
          })}
        </div>
      }
      {loading && <LinearProgress />}


      <div className={styles['end-content']}>
        <Button 
          variant="contained"
          disabled={checkedMail.length===0}
          onClick={onScan}
          >
            <RadarIcon/>
            Scan
          </Button>
        <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>  
    </div>
  );
}
