
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from '@/ui/primitives'
export default function BoutPage(){
  const { eventId } = useParams()
  const ev = useSelector((s:any)=> (s.events||[]).find((e:any)=> e.id===eventId))
  if (!ev) return (
    <Card className="grid place-items-center py-10 text-center">
      <div className="text-sm text-slate-600">Bout not found.</div>
      <Link to="/news" className="btn">Back to News</Link>
    </Card>
  )
  return (
    <div className="p-4 grid gap-4">
      <Card>
        <div className="text-sm font-semibold">Bout</div>
        <div className="mt-2 text-sm">{ev.text || '—'}</div>
      </Card>
    </div>
  )
}
