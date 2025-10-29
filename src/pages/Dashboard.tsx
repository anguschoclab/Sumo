import React, { useMemo } from 'react'
import { ensureWorld } from '../engine/store'
import { ensureRivalries } from '../engine/rivalries'

export default function Dashboard(){
  const world = useMemo(()=> ensureWorld(), [])
  const all = world.heyas.flatMap(h=>h.rikishi)

  const rivalries = (world.rivalries||[]).slice().sort((a,b)=> b.heat - a.heat).slice(0,10)
  const scouting = (world.scouting||[]).slice(0,10)

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="panel">
        <h2 className="font-semibold mb-2">Rivalries (Top 10)</h2>
        {rivalries.length===0 ? <div className="text-sm text-neutral-600">No rivalries yet. Run a week.</div> :
        <table className="table">
          <thead><tr><th>Rikishi A</th><th>Rikishi B</th><th>Heat</th><th>Meetings</th></tr></thead>
          <tbody>
            {rivalries.map((r,i)=>{
              const A = all.find(x=>x.id===r.aId)?.shikona ?? '—'
              const B = all.find(x=>x.id===r.bId)?.shikona ?? '—'
              return <tr key={i}><td>{A}</td><td>{B}</td><td>{r.heat}</td><td>{r.meetings}</td></tr>
            })}
          </tbody>
        </table>}
      </div>

      <div className="panel">
        <h2 className="font-semibold mb-2">Scouting (Latest)</h2>
        {scouting.length===0 ? <div className="text-sm text-neutral-600">No scouting notes yet. Use the Scout button on People.</div> :
        <table className="table">
          <thead><tr><th>Rikishi</th><th>Note</th><th>Conf</th><th>Freshness</th></tr></thead>
          <tbody>
            {scouting.map((s,i)=>{
              const name = all.find(x=>x.id===s.rikishiId)?.shikona ?? '—'
              return <tr key={i}><td>{name}</td><td>{s.note}</td><td>{Math.round(s.confidence*100)}%</td><td>{s.freshness}w</td></tr>
            })}
          </tbody>
        </table>}
      </div>
    </div>
  )
}
