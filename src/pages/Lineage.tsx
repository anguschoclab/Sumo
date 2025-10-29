import React, { useMemo } from 'react'
import { ensureWorld } from '../engine/store'
import { getMentor, menteesOf } from '../engine/lineage'

export default function Lineage(){
  const world = useMemo(()=> ensureWorld(), [])
  const edges = world.lineage || []
  const all = world.heyas.flatMap(h=>h.rikishi)
  const find = (id:string)=> all.find(r=>r.id===id)
  return (
    <div className="panel">
      <h2 className="text-lg font-semibold mb-3">Lineage</h2>
      {edges.length===0 ? <div className="text-sm text-neutral-600">No mentorship links yet. Assign some on the People page.</div> : (
        <table className="table">
          <thead><tr><th>Mentor</th><th>Mentee</th><th>Since week</th></tr></thead>
          <tbody>
            {edges.slice(0,200).map((e,i)=>(
              <tr key={i}><td>{find(e.mentorId)?.shikona}</td><td>{find(e.menteeId)?.shikona}</td><td>{e.sinceWeek}</td></tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-6">
        <h3 className="font-semibold mb-1">Tree (placeholder)</h3>
        <pre className="text-xs bg-neutral-50 rounded p-3 overflow-x-auto">
{renderForest(all)}
        </pre>
      </div>
    </div>
  )
}

function renderForest(all: any[]){
  // build mentor->mentees map
  const map = new Map<string, any[]>()
  for(const r of all){
    const kids = (r.menteeIds||[]).map((id:string)=> all.find(x=>x.id===id)).filter(Boolean)
    if(kids.length) map.set(r.id, kids as any[])
  }
  const roots = all.filter(r=> !r.mentorId && map.has(r.id))
  const lines: string[] = []
  const walk=(r:any,prefix:string)=>{
    lines.push(prefix + r.shikona)
    const kids = map.get(r.id)||[]
    kids.forEach((c,i)=> walk(c, prefix + (i===kids.length-1?'  └─ ':'  ├─ ')))
  }
  roots.slice(0,50).forEach(r=> walk(r,''))
  return lines.join('\n')
}
