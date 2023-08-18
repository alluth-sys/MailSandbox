import ArticleIcon from '@mui/icons-material/Article';
import {ListItemText, Paper, Typography} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import styles from '../../../styles/Task.module.css';

export default function DocumentDetail() {
  const router = useRouter()
  const [documentID, setDocumentID] = useState<string|string[]>();

  useEffect(()=>{
    if(!router.query.id) return
    setDocumentID(documentID);
  },[router.query.id])

  const URLToResource = (filename: string) =>{
    return `https://storage.googleapis.com/kowala-result/${documentID}_${filename}`
  }

  return (
    <div style={{padding:"3rem"}}>
      <Typography variant="h6">Screenshots</Typography>
      <div style={{display:"flex", overflow:"auto", gap:"1rem", padding:"1rem"}}>
        <Paper elevation={8} style={{width:"fit-content", padding:"0.5rem", border:"1px solid black"}}>
          <Image
            alt="init"
            src={URLToResource("1_init.jpg")}
            width={493}
            height={305}
          />
          <Typography>Initialization</Typography>
        </Paper>
        
        <Paper elevation={8} style={{width:"fit-content", padding:"0.5rem", border:"1px solid black"}}>
          <Image
            alt="procmon"
            src={URLToResource("2_procmon.jpg")}
            width={493}
            height={305}
          />
          <Typography>Process Monitor</Typography>
        </Paper>

        <Paper  elevation={8} style={{width:"fit-content", padding:"0.5rem", border:"1px solid black"}}> 
          <Image
            alt="openfile"
            src={URLToResource("3_openFile.jpg")}
            width={493}
            height={305}
          />
          <Typography>Open File</Typography>
        </Paper>
        
        <Paper  elevation={8} style={{width:"fit-content", padding:"0.5rem", border:"1px solid black"}}>
          <Image
            alt="closefile"
            src={URLToResource("4_closeFile.jpg")}
            width={493}
            height={305}
          />
          <Typography>Close File</Typography>
        </Paper>
      </div>
      <div style={{display:"flex", width:"50%", gap:"5rem"}}>
      <div style={{width:"100%"}}>
      <Typography variant="h6">Dynamic Analysis</Typography>
        <Paper style={{marginTop:"1rem", marginBottom:"1rem"}}>
          <List aria-label="static-analysis-list">
            <ListItemButton href={URLToResource('hkcc_differences.txt')}>
              <ListItemIcon>
                <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="HKCC" />
            </ListItemButton>
            <ListItemButton href={URLToResource('hkcr_differences.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="HKCR" />
            </ListItemButton>
            <ListItemButton href={URLToResource('hkcu_differences.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="HKCU" />
            </ListItemButton>
            <ListItemButton href={URLToResource('hklm_differences.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="HKLM" />
            </ListItemButton>
            <ListItemButton href={URLToResource('hku_differences.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="HKU" />
            </ListItemButton>
        </List>
        </Paper>
      </div>
      <div style={{width:"100%"}}>
        <Typography variant="h6">Static Analysis</Typography>
        <Paper style={{marginTop:"1rem", marginBottom:"1rem"}}>
          <List aria-label="static-analysis-list">
            <ListItemButton href={URLToResource('trid.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="Trid" />
            </ListItemButton>
            <ListItemButton href={URLToResource('pdfparser.txt')}>
              <ListItemIcon>
              <ArticleIcon className={styles['file-icon']}/>
              </ListItemIcon>
              <ListItemText primary="Parser" />
            </ListItemButton>
        </List>
        </Paper>
      </div>
      </div>
      
    </div>
  )
}
