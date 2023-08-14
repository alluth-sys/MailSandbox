import {ChangeEvent, useEffect} from 'react';
import styles from './file-dropper.module.css';

export default function FileDropper({setFileHandler}:{
    setFileHandler: (f: File) => void
}) {
    useEffect(()=>{
        const dropContainer = document.getElementById('dropcontainer');
        const fileInput = document.getElementById("filedrop") as HTMLInputElement;
    
        dropContainer?.addEventListener("dragover", (e) => {
          e.preventDefault()
        }, false)
    
        dropContainer?.addEventListener("dragenter", () => {
          dropContainer.classList.add("drag-active")
        })
    
        dropContainer?.addEventListener("dragleave", () => {
          dropContainer.classList.remove("drag-active")
        })
    
        dropContainer?.addEventListener("drop", (e) => {
          e.preventDefault()
    
          if(!e.dataTransfer?.files) return;
          dropContainer?.classList.remove("drag-active")
          fileInput.files = e.dataTransfer?.files;
    
        })
      },[])

      const onFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        setFileHandler(e.target.files[0]);
      }

  return (
    <div>
        <label htmlFor="filedrop" className={styles['drop-container']} id='dropcontainer'>
            <span className={styles['drop-title']}>Drop files here</span>
            or
            <input 
            className={styles['file-input']} 
            type="file" 
            accept="image/*" id='filedrop' 
            onChange={onFileChangeHandler}></input>
        </label>
        
    </div>
  )
}
