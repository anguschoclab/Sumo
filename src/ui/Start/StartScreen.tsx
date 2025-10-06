
import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Button } from '@/ui/primitives'
export default function StartScreen(){
  const d = useDispatch()
  const [busy, setBusy] = React.useState(false)
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <Card className="max-w-lg w-full">
        <div className="text-center">
          <div className="text-3xl font-black tracking-wide">Basho</div>
          <div className="mt-1 text-slate-600">Sumo Stable Management</div>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          Forge a legendary heya, mentor rikishi, and write your name into the banzuke.
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button className="primary" disabled={busy} onClick={()=>{
            if (busy) return;
            setBusy(true);
            d({ type:'NEW_GAME', seed: Date.now() })
          }}>New Game</Button>
        </div>
      </Card>
    </div>
  )
}
