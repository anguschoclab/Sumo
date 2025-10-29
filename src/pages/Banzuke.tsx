import React, { useMemo, useState } from 'react'
import { ensureWorld } from '../engine/store'
import type { Division, Rikishi } from '../engine/types'
import { yokozunaCandidates } from '../engine/governance'
const DIVS:Division[]=['Makuuchi','Juryo','Makushita','Sandanme','Jonidan','Jonokuchi']
function splitEastWest(rows:Rikishi[]){ const east=rows.filter(r=>r.rank.side==='East'); const west=rows.filter(r=>r.rank.side==='West'); return {east,west} }
export default function Banzuke(){
  const world = useMemo(()=> ensureWorld(), [])
  const [div, setDiv] = useState<Division>('Makuuchi')
  const all = world.heyas.flatMap(h=>h.rikishi).filter(r=>r.rank.division===div)
  // Yokozuna(s) to top, then Ozeki, then rank
  all.sort((a,b)=> (titleWeight(b.title)-titleWeight(a.title)) || (a.rank.rank-b.rank.rank) || (a.rank.side==='East'?-1:1))
  const {east,west} = splitEastWest(all)
  const watch = div==='Makuuchi'? yokozunaCandidates(world): []
  return (
    <div className="panel">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Banzuke — {div}</h2>
        <select className="border rounded px-2 py-1" value={div} onChange={e=>setDiv(e.target.value as Division)}>
          {DIVS.map(d=>(<option key={d} value={d}>{d}</option>))}
        </select>
        {watch.length>0 && <span className="badge">Yokozuna Watch: {watch.length}</span>}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">East</h3>
          <table className="table"><thead><tr><th>Rank</th><th>Shikona</th><th>Title</th><th>Heya</th></tr></thead>
          <tbody>{east.map(r=>(<tr key={r.id}><td>{r.rank.rank}</td><td>{r.shikona}</td><td>{r.title}</td><td>{world.heyas.find(h=>h.rikishi.includes(r))?.name}</td></tr>))}</tbody></table>
        </div>
        <div>
          <h3 className="font-semibold mb-2">West</h3>
          <table className="table"><thead><tr><th>Rank</th><th>Shikona</th><th>Title</th><th>Heya</th></tr></thead>
          <tbody>{west.map(r=>(<tr key={r.id}><td>{r.rank.rank}</td><td>{r.shikona}</td><td>{r.title}</td><td>{world.heyas.find(h=>h.rikishi.includes(r))?.name}</td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  )
}
function titleWeight(t: 'none'|'ozeki'|'yokozuna'){ return t==='yokozuna'?2: t==='ozeki'?1:0 }
