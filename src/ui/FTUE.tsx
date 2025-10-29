import React, { useState } from 'react'
import { setFlag } from '@state/flags'
import { seedIfEmpty } from '@engine/world'

export default function FTUE({ onDone }:{ onDone:()=>void }){
  const [playerName, setPlayerName] = useState('')
  const [heyaName, setHeyaName] = useState('Shirakaba')
  const [error, setError] = useState<string | null>(null)

  function start(){
    if(!playerName.trim()){
      setError('Please enter your name.')
      return
    }
    try {
      localStorage.setItem('sumo:player', JSON.stringify({ playerName, heyaName }))
      seedIfEmpty()
      setFlag('ftueComplete', true)
      onDone()
    } catch(e){
      setError('Unable to save. Check browser storage permissions.')
    }
  }

  return (
    <div style={{maxWidth:560, margin:'40px auto', padding:20, border:'1px solid #e5e7eb', borderRadius:12}}>
      <h2>Welcome to Sumo Manager</h2>
      <p>Set up your stable before you begin.</p>
      <label style={{display:'block', marginTop:12}}>Your Name
        <input value={playerName} onChange={e=>setPlayerName(e.target.value)} style={{width:'100%'}} />
      </label>
      <label style={{display:'block', marginTop:12}}>Heya Name
        <input value={heyaName} onChange={e=>setHeyaName(e.target.value)} style={{width:'100%'}} />
      </label>
      {error && <p style={{color:'crimson'}}>{error}</p>}
      <div style={{marginTop:16, display:'flex', gap:8}}>
        <button onClick={start}>Start Career</button>
        <button onClick={()=>onDone()}>Skip (use defaults)</button>
      </div>
    </div>
  )
}
