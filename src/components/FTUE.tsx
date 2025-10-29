
import React, { useState } from 'react'

type Props = { onComplete: (player: string, heya: string) => void }

export default function FTUE({ onComplete }: Props) {
  const [player, setPlayer] = useState('Coach')
  const [heya, setHeya] = useState('Shirokuma-beya')
  return (
    <div className="card" style={{maxWidth:560, margin:'1rem auto'}}>
      <h2>Welcome!</h2>
      <p className="muted">Set up your identity and stable to get started.</p>
      <label>Player Name<br/>
        <input value={player} onChange={e=>setPlayer(e.target.value)} style={{width:'100%'}}/>
      </label>
      <br/>
      <label>Heya Name<br/>
        <input value={heya} onChange={e=>setHeya(e.target.value)} style={{width:'100%'}}/>
      </label>
      <br/>
      <button className="btn" onClick={()=>onComplete(player.trim(), heya.trim())}>Enter Dojo</button>
    </div>
  )
}
