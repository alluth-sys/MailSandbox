import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import axios from 'axios';
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function MailScan() {
  const [mailData, setData] = useState<MicrosoftGraph.Message[]>();
  const { data: session } = useSession();
  
  useEffect(()=>{
    if(!session) return
    axios.get("https://graph.microsoft.com/v1.0/me/messages",{
      headers:{Authorization:`Bearer ${session.accessToken}`}
    })
    .then((res)=>{
      if(res.statusText !== 'OK') return;

      setData(res.data.value)
    })
    .catch((e)=>{alert(e)})
  },[session])

  return (
    <div>
      {mailData && 
        <div>
          {mailData.map((value)=>{
            return <div key={value.id}>{value.subject}</div>
          })}
        </div>
      }
    </div>
  );
}
