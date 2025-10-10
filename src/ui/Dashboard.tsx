import React from 'react'
import { useGame } from './store'
import { Card, Button } from './ds'

export function Dashboard(){
  const u = useGame(s=>s.universe)
  const simDay = useGame(s=>s.simDay)
  const saveOpen = useGame(s=>s.openSaveModal)
  if(!u) return null
  return (
    <div style={{padding:16}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <h2 style={{margin:0}}>Day {u.day}</h2>
        <Button onClick={simDay}>Sim Day</Button>
        <Button onClick={saveOpen}>Saves</Button>
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
        {u.rikishi.map(r=>(
          <Card key={r.id}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <b>{r.shikona}</b><span style={{opacity:.8,fontSize:12}}>{r.rank}</span>
            </div>
            <div style={{fontSize:12,opacity:.8}}>{r.heya} • {r.division} • {r.side}</div>
            <div className="badge" style={{marginTop:6}}>{r.flags.join(' ')}</div>
            {r.lastBout && <div style={{marginTop:8,fontSize:12,opacity:.9}}><b>Last bout:</b> {r.lastBout.aftermath}</div>}
          </Card>
        ))}
      </div>
    </div>
  )
}
