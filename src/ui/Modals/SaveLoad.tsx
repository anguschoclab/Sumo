
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { listSaves, saveAs, load, remove } from '@/utils/SaveManager'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/ui/_ds'

export default function SaveLoadModal({ open, onOpenChange }:{ open:boolean; onOpenChange:(v:boolean)=>void }){
  const world = useSelector((s:any)=>s)
  const d = useDispatch()
  const [name, setName] = React.useState('')
  const [saves, setSaves] = React.useState<any[]>([])

  const refresh = ()=> setSaves(listSaves())
  React.useEffect(()=>{ if (open) refresh() }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60"/>
        <Dialog.Content className="panel fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl">
          <Dialog.Title className="text-sm font-semibold">Save / Load</Dialog.Title>

          <div className="mt-3 grid gap-3">
            <div className="rounded-xl border border-white/10 p-3">
              <div className="text-sm font-semibold">Create Save</div>
              <div className="mt-2 flex gap-2">
                <input value={name} onChange={e=> setName(e.target.value)} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-sm w-full" placeholder="Save name"/>
                <Button className="primary" onClick={()=>{ if(!name.trim()) return; saveAs(name.trim(), world); setName(''); refresh() }}>Save</Button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-3">
              <div className="text-sm font-semibold">Your Saves</div>
              {saves.length===0 && <div className="text-sm text-muted mt-2">No saves yet.</div>}
              <div className="mt-2 grid gap-2">
                {saves.map(s=> (
                  <div key={s.id} className="flex items-center justify-between border border-white/10 rounded-lg px-3 py-2">
                    <div className="text-sm">{s.name} <span className="text-xs text-muted">• {new Date(s.iso).toLocaleString()}</span></div>
                    <div className="flex gap-2">
                      <Button className="ghost" onClick={()=>{ const w = load(s.id); if (w){ d({ type:'LOAD_STATE', world:w }) }}}>Load</Button>
                      <Button className="ghost" onClick={()=>{ remove(s.id); refresh() }}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end"><Dialog.Close className="btn primary">Close</Dialog.Close></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
