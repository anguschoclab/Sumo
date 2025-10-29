
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from '@/ui/primitives'
import { rivalryRank } from '@/game/rivalry'
import { predictNextClash } from '@/game/rivalry/predict'
import { Link } from 'react-router-dom'

export default function RivalryWidget(){
  const state = useSelector((s:any)=> s)
  const edges = (state.rivalries?.rikishi || []).slice().sort((a:any,b:any)=> rivalryRank(b)-rivalryRank(a))
  const top = edges.slice(0,3)
  if (!top.length) return null
  return (
    <div className="rivalry-card" role="region" aria-labelledby="rivalry-head">
      <div id="rivalry-head" className="rivalry-header">Rivalry Storylines</div>
      <div className="rivalry-body">
        {top.map((e:any)=> <Row key={e.aId+e.bId} e={e} state={state}/>)}
        <div className="flex justify-end">
          <Link to="/rivalries" className="btn">View All Rivalries</Link>
        </div>
      </div>
    </div>
  )
}
function Row({e, state}:{e:any; state:any}){
  const A = state.rikishi.find((x:any)=> x.id===e.aId) || { shikona: e.aId }
  const B = state.rikishi.find((x:any)=> x.id===e.bId) || { shikona: e.bId }
  const pred = predictNextClash(state, e.aId, e.bId)
  const d = useDispatch()
  return (
    <div className="rounded-xl border p-3 flex items-center justify-between">
      <div className="min-w-0">
        <div className="font-semibold truncate">{A.shikona} <span className="opacity-60">vs</span> {B.shikona}</div>
        <div className="text-[12px] text-slate-600">H2H {e.h2h?.aWins??0}–{e.h2h?.bWins??0} • Heat {e.heat??0} • Score {e.score??0}</div>
        <div className="mt-1 flex gap-2">
          {e.titleBouts>0 && <span className="badge-next">Title stakes ×{e.titleBouts}</span>}
          {pred && <span className="badge-next">Next Clash: Day {pred.day} ({Math.round(pred.confidence*100)}%)</span>}
        </div>
      </div>
      <button className="btn primary" onClick={()=> d({ type:'UI_OPEN_RIVALRY_MODAL', aId:e.aId, bId:e.bId })}>Details</button>
    </div>
  )
}
