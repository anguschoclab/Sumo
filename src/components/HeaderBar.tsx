import React from 'react'
import { addDay, addWeek, nextBasho, cancelSkip, getStopMode, toggleStopMode } from '@engine/skip'
import { useWorld } from '@engine/world'
import { toDate } from '@engine/time'

export default function HeaderBar() {
  const w = useWorld()
  const dateStr = toDate(w).toDateString()
  const mode = getStopMode()

  return (
    <div style={{display:'flex', gap:12, alignItems:'center', padding:'8px 12px', borderBottom:'1px solid #ddd'}}>
      <strong>Sumo • {dateStr}</strong>
      <button onClick={addDay}>+ Day</button>
      <button onClick={addWeek}>+ Week</button>
      <button onClick={nextBasho}>⏭ Next Basho</button>
      <button onClick={cancelSkip}>Cancel</button>
      <span style={{marginLeft:'auto'}}>
        Stop Mode: <code>{mode}</code> <button onClick={toggleStopMode}>Toggle</button>
      </span>
    </div>
  )
}
