
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from '@/ui/primitives'
import { predictNextClash } from '@/game/rivalry/predict'

export default function RivalryModal(){
  const ui = useSelector((s:any)=> s.ui?.rivalryModal)
  const open = !!ui?.open
  const aId = ui?.aId, bId = ui?.bId
  const state = useSelector((s:any)=> s)
  const d = useDispatch()
  const trapRef = React.useRef<HTMLDivElement>(null)

  const close = ()=> d({ type:'UI_CLOSE_RIVALRY_MODAL' })

  React.useEffect(()=>{
    if (!open) return
    const el = trapRef.current!
    const nodes = el.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
    const first = nodes[0], last = nodes[nodes.length-1]
    const onKey=(e:KeyboardEvent)=>{
      if (e.key==='Tab'){
        if (e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
      }
    }
    document.addEventListener('keydown', onKey)
    first?.focus()
    return ()=> document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const edge = (state.rivalries?.rikishi||[]).find((e:any)=>{
    const k=(x:string,y:string)=> x<y?`${x}|${y}`:`${y}|${x}`
    return k(e.aId,e.bId)===k(aId,bId)
  })
  const A = state.rikishi.find((x:any)=> x.id===aId)
  const B = state.rikishi.find((x:any)=> x.id===bId)
  if (!A || !B || !edge){
    return (
      <>
        <div className="modal-backdrop" onPointerDown={close}/>
        <div className="modal-sheet" onPointerDown={(e)=> e.target===e.currentTarget && close()}>
          <div className="modal-panel" onPointerDown={(e)=> e.stopPropagation()}>
            <div className="text-sm text-slate-600">Rivalry data unavailable.</div>
            <button className="btn mt-2" onClick={close}>Close</button>
          </div>
        </div>
      </>
    )
  }
  const pred = predictNextClash(state, aId, bId)
  return (
    <>
      <div className="modal-backdrop" onPointerDown={close}/>
      <div className="modal-sheet" onPointerDown={(e)=> e.target===e.currentTarget && close()}>
        <div ref={trapRef} className="modal-panel" onPointerDown={(e)=> e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Rivalry Details</div>
            <Button className="btn icon" aria-label="Close" onClick={close}>✕</Button>
          </div>
          <div className="rivalry-card mt-2">
            <div className="rivalry-header">{A.shikona} vs {B.shikona}</div>
            <div className="rivalry-body">
              <div className="text-sm">H2H <b>{edge.h2h?.aWins??0}–{edge.h2h?.bWins??0}</b> • Heat <b>{edge.heat??0}</b></div>
              {pred && <div className="badge-next">Next Clash: Day {pred.day} ({Math.round(pred.confidence*100)}%)</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
