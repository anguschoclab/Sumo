
import React from 'react'
import { useWorld } from '@engine/world'
import { toDateString } from '@engine/time'
import { addDay, addWeek, nextBasho, cancelSkip, getStopMode, toggleStopMode } from '@engine/skip'

export default function HeaderBar() {
  const w = useWorld()
  return (
    <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'.75rem'}}>
      <div>
        <div style={{fontWeight:600}}>Sumo Manager</div>
        <div className="muted">{toDateString(w)}</div>
      </div>
      <div className="row">
        <button className="btn" onClick={()=>{console.debug('[HUD] + Day'); addDay()}}>+ Day</button>
        <button className="btn" onClick={()=>{console.debug('[HUD] + Week'); addWeek()}}>+ Week</button>
        <button className="btn" onClick={()=>{console.debug('[HUD] Next Basho'); nextBasho()}}>⏭ Next Basho</button>
        <button className="btn" onClick={()=>{console.debug('[HUD] Cancel'); cancelSkip()}}>Cancel</button>
        <button className="btn" onClick={()=>{console.debug('[HUD] StopMode'); toggleStopMode()}}>Stop: {getStopMode()}</button>
      </div>
    </div>
  )
}
