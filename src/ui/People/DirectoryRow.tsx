
import React from 'react'
import { Button } from '@/ui/primitives'

export default function DirectoryRow({ r, onPick, selected }:{ r:any; onPick:(id:string)=>void; selected?:boolean }){
  return (
    <div className={`row-fixed flex items-center justify-between rounded-lg ${selected?'bg-slate-50':''}`}>
      <div className="truncate">
        <div className="font-medium truncate">{r.shikona}{r.shikonaKanji && <span className="ml-1 text-slate-500">{r.shikonaKanji}</span>}</div>
        <div className="text-[12px] text-slate-600 truncate">{r.rankTitle || r.division}{r.heyaShort?` • ${r.heyaShort}`:''}</div>
      </div>
      <Button className="btn icon" onClick={()=>onPick(r.id)} title="Open" aria-label={`Open ${r.shikona}`}>Open</Button>
    </div>
  )
}
