import {useState} from 'react';
import FileDropper from '../components/FileDropper/file-dropper';
import styles from '../styles/DocScan.module.css';


export default function DocScan() {
  const [file, setFile] = useState<File>()

  const setFileHandler = (f:File) =>{
    setFile(f);
    console.log(f)
  }
  
  return (
    <div className={styles.container}>
      <FileDropper setFileHandler={setFileHandler} />
    </div>
  )
}
