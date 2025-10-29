import React, { useState, useEffect } from 'react'
import KimaritePicker from './KimaritePicker'
import { setBout, getBout } from '../state/bouts'

export default function MatchCard({ id, east, west }) {
  const [result, setResult] = useState(() => getBout(id) || { id, east, west })

  useEffect(() => {
    const handle = e => setResult(prev => getBout(id) || prev)
    window.addEventListener('bouts:updated', handle)
    return () => window.removeEventListener('bouts:updated', handle)
  }, [id])

  const setWinner = (winner) => {
    const next = { ...result, winner }
    setResult(next)
    setBout(next)
  }

  const setKimarite = (kid) => {
    const next = { ...result, kimariteId: kid }
    setResult(next)
    setBout(next)
  }

  return (
    <div className="p-3 border rounded flex items-center gap-3">
      <button onClick={() => setWinner('east')} className={result.winner==='east' ? 'bg-green-600 text-white px-2' : 'px-2'}>{east}</button>
      <span>vs</span>
      <button onClick={() => setWinner('west')} className={result.winner==='west' ? 'bg-green-600 text-white px-2' : 'px-2'}>{west}</button>
      <div className="ml-auto"><KimaritePicker value={result.kimariteId} onChange={setKimarite} /></div>
    </div>
  )
}
