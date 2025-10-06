
import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '@/ui/primitives'
import { Link } from 'react-router-dom'
export default function NewsFeed(){
  const news = useSelector((s:any)=> s.news||[])
  const rikishiIndex = useSelector((s:any)=> Object.fromEntries((s.rikishi||[]).map((r:any)=> [r.id, r])) )
  return (
    <div className="p-4 grid gap-3" aria-live="polite">
      {news.map((n:any)=> (
        <Card key={n.id} className="press-card">
          <div className="text-sm font-semibold">{n.headline}</div>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {(n.bullets||[]).map((b:any, i:number)=> (
              <li key={i}>{renderBullet(b, rikishiIndex)}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
function renderBullet(b:any, idx:any){
  if (typeof b === 'string') return b
  if (b?.type === 'honor' && b.rikishiId){
    const r = idx[b.rikishiId]; const name = r?.shikona || b.rikishiId
    return (<><span className="chip gold">{b.label}</span>{' '}— <Link to={`/rikishi/${encodeURIComponent(b.rikishiId)}?tab=honors`} className="underline">{name}</Link></>)
  }
  return b?.label || '—'
}
