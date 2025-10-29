import React, { useMemo, useState } from 'react'
import { ensureWorld } from '../engine/store'
import { assignMentor } from '../engine/lineage'
import { generateShikona } from '../engine/shikona'
import { topRivalryFor } from '../engine/rivalries'
import { quickScout } from '../engine/scouting'

export default function People(){
  const world = useMemo(()=> ensureWorld(), [])
  const rikishi = world.heyas.flatMap(h => h.rikishi)
  const [q, setQ] = useState('')
  const [mentorId, setMentorId] = useState<string>('')
  const filtered = rikishi.filter(r => r.shikona.toLowerCase().includes(q.toLowerCase()))
  const onAssign = (rid:string)=>{
    const mentee = rikishi.find(r=>r.id===rid)!
    const mentor = rikishi.find(r=>r.id===mentorId)
    if(!mentor) return alert('Select a mentor first.')
    const msg = assignMentor(world, mentee, mentor)
    alert(msg)
  }
  const onGen = (rid:string)=>{
    const r = rikishi.find(x=>x.id===rid)!
    const heya = world.heyas.find(h=>h.rikishi.includes(r))
    r.shikona = generateShikona(world, heya?.name)
  }
  const onScout = (rid:string)=>{
    const r = rikishi.find(x=>x.id===rid)!
    const entry = quickScout(world, r)
    alert(`Scouted ${r.shikona}: ${entry.note} (conf ${(entry.confidence*100).toFixed(0)}%)`)
  }
  return (
    <div className="panel">
      <div className="flex items-center gap-2 mb-3">
        <input className="border rounded px-3 py-2 w-full" placeholder="Search shikona…" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border rounded px-2 py-2" value={mentorId} onChange={e=>setMentorId(e.target.value)}>
          <option value="">Select mentor…</option>
          {rikishi.slice(0,400).map(r=>(<option key={r.id} value={r.id}>{r.shikona}</option>))}
        </select>
        <div className="text-sm text-neutral-500">{filtered.length} / {rikishi.length}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {filtered.slice(0,200).map(r => {
          const rv = topRivalryFor(world, r)
          return (
          <div key={r.id} className="border rounded-xl p-3 bg-white">
            <div className="font-semibold">{r.shikona}</div>
            <div className="text-xs text-neutral-600">{r.hometown} • {r.weightKg}kg • {r.heightCm}cm • {r.style}</div>
            <div className="mt-1 text-xs">
              <span className="tag">Fatigue {r.fatigue}</span>{' '}
              <span className="tag">Form {r.form.toFixed(1)}</span>{' '}
              {r.mentorId && <span className="badge">Mentor</span>}
              {rv ? <span className="tag">Rival: {rv.other?.shikona ?? '—'} ({rv.heat})</span> : <span className="tag">Rival: —</span>}
            </div>
            <div className="mt-2 flex gap-2">
              <button className="btn" onClick={()=>onAssign(r.id)}>Assign mentor</button>
              <button className="btn" onClick={()=>onGen(r.id)}>Generate Shikona</button>
              <button className="btn" onClick={()=>onScout(r.id)}>Scout</button>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
