import {useSnackbar} from '@/hooks/useSnackBar';
import RadarIcon from '@mui/icons-material/Radar';
import {Button} from '@mui/material';
import axios, {AxiosError} from 'axios';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import FileDropper from '../components/FileDropper/file-dropper';
import styles from '../styles/DocScan.module.css';


export default function DocScan() {
  const [file, setFile] = useState<File>()
  const showSnackbar = useSnackbar()

  const setFileHandler = (f:File) =>{
    setFile(f);
  }

  const uploadFileHandler = () =>{
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskID', uuidv4())

    axios.post(`http://localhost:8777/uploadDocument`,formData)
    .then((res)=>{
      if(res.statusText !== 'OK') return
      showSnackbar(`Successfully create task: ${res.data.taskID}`)
    }).catch((e: AxiosError)=>{
      showSnackbar(e.message)
    })
  }  
  return (
    <div>
      <div className={styles['dropper-container']}>
        <FileDropper setFileHandler={setFileHandler} />
      </div>
      <div className={styles['btn-container']}>
        <Button 
          onClick={uploadFileHandler} 
          variant='contained'
          disabled={file===undefined}
          >
          <RadarIcon/>
            Scan Document
        </Button>
      </div>
    </div>
   
    
  )
}
