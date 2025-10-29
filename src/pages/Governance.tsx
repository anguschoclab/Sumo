import React, { useMemo, useState } from 'react'
import { ensureWorld } from '../engine/store'
import { councilDeliberation, promotionReview, yokozunaCandidates } from '../engine/governance'
export default function Governance(){
  const world = useMemo(()=> ensureWorld(), [])
  const [message, setMessage] = useState<string>('')
  const onCouncil = ()=> { councilDeliberation(world); setMessage('Council convened. Notes updated.') }
  const onPromotion = ()=> { const m = promotionReview(world); setMessage(m) }
  const candidates = yokozunaCandidates(world)
  return (
    <div className="panel">
      <h2 className="text-lg font-semibold mb-2">Governance</h2>
      <div className="flex gap-2 mb-3">
        <button className="btn" onClick={onCouncil}>Council Deliberation</button>
        <button className="btn" onClick={onPromotion}>Promotion Review</button>
      </div>
      {message && <div className="mb-3 text-sm">{message}</div>}
      <div className="mb-3">
        <h3 className="font-semibold">Yokozuna Watch</h3>
        {candidates.length===0? <div className="text-sm text-neutral-600">No active candidates.</div> :
          <ul className="list-disc ml-5 text-sm text-neutral-700">{candidates.map(c=>(<li key={c.id}>{c.shikona} — form {c.form} (rank {c.rank.rank})</li>))}</ul>}
      </div>
      <div>
        <h3 className="font-semibold">Council Notes</h3>
        <ul className="list-disc ml-5 text-sm text-neutral-700">{world.councilNotes.map((n,i)=>(<li key={i}>{n}</li>))}</ul>
      </div>
    </div>
  )
}
