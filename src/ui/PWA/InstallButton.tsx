
import React from 'react'
import { onInstallAvailable, triggerInstall, setupInstallPrompt } from '@/pwa/installPrompt'
export default function InstallButton(){
  const [avail, setAvail] = React.useState(false)
  React.useEffect(()=>{
    setupInstallPrompt()
    const off = onInstallAvailable(()=> setAvail(true))
    return off
  },[])
  if (!avail) return null
  return (
    <button className="btn primary" onClick={async()=>{ await triggerInstall(); }}>
      Install App
    </button>
  )
}
