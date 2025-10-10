import React from 'react'
import { useGame } from './store'
import { Card, Button } from './ds'

export function SaveModal(){
  const open = useGame(s=>s.saveModalOpen)
  const close = useGame(s=>s.closeSaveModal)
  const quicksave = useGame(s=>s.quicksave)
  const quickload = useGame(s=>s.quickload)
  const saveNamed = useGame(s=>s.saveNamed)
  const loadNamed = useGame(s=>s.loadNamed)
  const deleteNamed = useGame(s=>s.deleteNamed)
  const list = useGame(s=>s.listSaves)()
  const [name,setName]=React.useState('campaign-1')
  if(!open) return null
  return (
    <div className="modal">
      <div className="card" style={{width:720,maxWidth:'92vw'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0}}>Saves</h3>
          <Button onClick={close}>Close</Button>
        </div>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <Card>
            <div>Name</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <Button onClick={()=>saveNamed(name)}>Save</Button>
              <Button onClick={()=>loadNamed(name)}>Load</Button>
            </div>
          </Card>
          <Card>
            <div style={{display:'flex',gap:8}}>
              <Button onClick={quicksave}>Quicksave</Button>
              <Button onClick={quickload}>Quickload</Button>
            </div>
          </Card>
        </div>
        <div style={{marginTop:8}}>
          <div style={{opacity:.8,fontSize:12,marginBottom:6}}>Existing saves</div>
          <div style={{maxHeight:200,overflow:'auto'}}>
            {list.length===0? <div style={{opacity:.7}}>None</div> : list.map(s=>(
              <div key={s} style={{display:'flex',justifyContent:'space-between',padding:'6px 8px',border:'1px solid var(--border)',borderRadius:12,marginBottom:6,background:'#0f172a'}}>
                <div>{s}</div>
                <div style={{display:'flex',gap:8}}>
                  <Button onClick={()=>loadNamed(s)}>Load</Button>
                  <Button onClick={()=>deleteNamed(s)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
