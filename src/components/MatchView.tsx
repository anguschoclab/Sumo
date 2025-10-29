
import React from 'react'

export type Bout = {
  east: string
  west: string
  dohyo: string
  time: string
  result?: string
}

type Props = { todaysBouts: Bout[] }

export default function MatchView({ todaysBouts }: Props) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0}}>Match Card</h3>
        <span className="pill">Demo</span>
      </div>
      <ul style={{listStyle:'none', padding:0, margin:'.5rem 0 0 0'}}>
        {todaysBouts.map((b, i)=>(
          <li key={i} style={{padding:'.5rem 0', borderTop:'1px solid #2e3447'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{b.east}</strong> vs <strong>{b.west}</strong>
                <div className="muted" style={{fontSize:'.85rem'}}>Dohyō: {b.dohyo} • {b.time}</div>
              </div>
              <div className="pill">{b.result ?? '—'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
