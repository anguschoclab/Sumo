
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function DecisionRouter({ d, onResolve }:{ d:any; onResolve:()=>void }){
  const state = useSelector((s:any)=> s)
  const dispatch = useDispatch()
  if (!d) return null
  // Placeholder decisions; in full build hook real modals
  if (d.kind==='yokozuna-deliberation'){
    return <div className="text-sm">Yokozuna deliberation for {d.rikishiId}<br/>
      <button className="btn primary" onClick={()=>{ dispatch({ type:'YOKOZUNA_PROMOTE', rikishiId:d.rikishiId, votes:13 }); onResolve(); }}>Approve</button>
    </div>
  }
  return <div className="text-sm">Unhandled decision</div>
}
