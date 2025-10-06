
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from '@/ui/primitives'
import { DecisionRouter } from './Router'

export default function DecisionCenter(){
  const d = useSelector((s:any)=> (s.decisions||[])[0] || null)
  const dispatch = useDispatch()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(()=>{
    if (!d) return
    const el = ref.current
    el?.querySelector<HTMLElement>('button, [href], select, input')?.focus()
    const onKey=(e:KeyboardEvent)=>{ if (e.key==='Escape') dispatch({ type:'DECISION_SKIP_ONE' }) }
    document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  }, [d, dispatch])

  if (!d) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 p-4" role="dialog" aria-modal="true">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Decision Required</div>
            <Button onClick={()=> dispatch({ type:'DECISION_SKIP_ONE' })}>Skip (Dev)</Button>
          </div>
          <DecisionRouter d={d} onResolve={()=> dispatch({ type:'DECISION_RESOLVE_ONE' })} />
        </Card>
      </div>
    </div>
  )
}
