
import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '@/ui/primitives'

export default function NewsFeed(){
  const news = useSelector((s:any)=> s.news||[])
  return (
    <div className="p-4 grid gap-3" aria-live="polite">
      {news.map((n:any)=> (
        <Card key={n.id} className="press-card">
          <div className="text-sm font-semibold">{n.headline}</div>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {(n.bullets||[]).map((b:string, i:number)=> <li key={i}>{b}</li>)}
          </ul>
        </Card>
      ))}
    </div>
  )
}
