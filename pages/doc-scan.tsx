import RadarIcon from '@mui/icons-material/Radar';
import {Button} from '@mui/material';
import axios from 'axios';
import {useState} from 'react';
import FileDropper from '../components/FileDropper/file-dropper';
import styles from '../styles/DocScan.module.css';


export default function DocScan() {
  const [file, setFile] = useState<File>()

  const setFileHandler = (f:File) =>{
    setFile(f);
  }

  const uploadFileHandler = () =>{
    if(!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://localhost:8777/uploadDocument`,formData).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
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
