import React from 'react'
import { useNavigate } from 'react-router-dom'
import { newWorld } from '../engine/world'
import { setWorld } from '../engine/store'
export default function Start(){
  const nav = useNavigate()
  const onNew = () => { const w=newWorld(); setWorld(w); nav('/dashboard') }
  return (
    <div className="panel max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Basho — Start</h1>
      <p className="text-sm text-neutral-600 mb-4">You are an oyakata running a heya. Generate a living world and lead your rikishi.</p>
      <button onClick={onNew} className="btn">New Game</button>
      <p className="mt-3 text-xs text-neutral-500">Sprint D baseline with Governance.</p>
    </div>
  )
}
