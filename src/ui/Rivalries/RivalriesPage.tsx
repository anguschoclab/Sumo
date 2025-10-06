
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, SectionTitle } from '@/ui/primitives'
import { rivalryRank } from '@/game/rivalry'

export default function RivalriesPage(){
  const rr = useSelector((s:any)=> s.rivalries?.rikishi || [])
  const rows = React.useMemo(()=> rr.slice().sort((a:any,b:any)=> rivalryRank(b)-rivalryRank(a)).slice(0,50), [rr])
  return (
    <div className="p-4 grid gap-4">
      <Card>
        <SectionTitle>Rikishi Rivalries (Top 50)</SectionTitle>
        <div className="mt-2 grid gap-2">
          {rows.map((e:any)=> <Row key={e.aId+e.bId} e={e}/>)}
        </div>
      </Card>
    </div>
  )
}
function Row({e}:{e:any}){
  return (
    <div className="rounded-lg border p-2 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-medium">{e.aId} vs {e.bId}</div>
        <div className="text-[12px] text-slate-600">H2H {e.h2h?.aWins??0}–{e.h2h?.bWins??0} • Heat {e.heat??0} • Score {e.score??0}</div>
      </div>
      <div className="flex gap-1">{(e.tags||[]).map((t:string)=> <span key={t} className="badge-next">{t}</span>)}</div>
    </div>
  )
}
