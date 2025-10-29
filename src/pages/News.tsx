import React, { useMemo, useState } from 'react'
import { ensureWorld } from '../engine/store'
import { generatePreBashoPreview, generatePostBashoReview } from '../engine/narrative'
export default function News(){
  const world = useMemo(()=> ensureWorld(), [])
  const preview = useMemo(()=> generatePreBashoPreview(world), [world])
  const [review, setReview] = useState<{title:string,lines:string[]}|null>(null)
  return (
    <div className="panel">
      <h2 className="text-lg font-semibold mb-2">News</h2>
      <div className="mb-4">
        <h3 className="font-semibold">{preview.title}</h3>
        <ul className="list-disc ml-5 text-sm text-neutral-700">{preview.lines.map((l,i)=>(<li key={i}>{l}</li>))}</ul>
      </div>
      <div className="mb-2"><button className="btn" onClick={()=> setReview(generatePostBashoReview(world))}>Generate Review</button></div>
      {review && (<div className="mt-3"><h3 className="font-semibold">{review.title}</h3><ul className="list-disc ml-5 text-sm text-neutral-700">{review.lines.map((l,i)=>(<li key={i}>{l}</li>))}</ul></div>)}
    </div>
  )
}
