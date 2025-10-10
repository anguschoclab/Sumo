import React from 'react'
import { Card, Button } from './ds'
import { useGame } from './store'

export function Start(){
  const start = useGame(s=>s.startNew)
  const [name,setName]=React.useState('Manager')
  const [heya,setHeya]=React.useState('Miyagino')
  return (
    <div style={{display:'grid',placeItems:'center',height:'100%'}}>
      <Card style={{maxWidth:520}}>
        <h1 style={{margin:'8px 0'}}>SumoGame</h1>
        <p style={{color:'var(--muted)'}}>Create a new world and lead your heya.</p>
        <div className="grid">
          <div>
            <div>Your name</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <div>Heya name</div>
            <input className="input" value={heya} onChange={e=>setHeya(e.target.value)} />
          </div>
        </div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <Button onClick={()=>start(name,heya)}>New Game</Button>
        </div>
      </Card>
    </div>
  )
}
