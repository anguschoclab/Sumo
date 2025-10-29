
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/_ds'

const SUGGESTED = ['Dewanoumi', 'Miyagino', 'Kasugano', 'Takasago', 'Musashigawa', 'Kise']
const CRESTS = ['rope','torii','gunbai','taiko'] as const
const COLORS = ['mw-indigo','mw-emerald','mw-rose','mw-gold'] as const
const COACHES = ['Old Bear','Quiet Storm','Iron Palm','Silk Rope']

export default function StartScreen(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const started = useSelector((s:any)=> !!s.flags?.started)
  const [busy, setBusy] = React.useState(false)
  const [playerName, setPlayerName] = React.useState('')
  const [heyaName, setHeyaName] = React.useState(SUGGESTED[0])
  const [customHeya, setCustomHeya] = React.useState('')
  const [crest, setCrest] = React.useState<typeof CRESTS[number]>('rope')
  const [mwColor, setMwColor] = React.useState<typeof COLORS[number]>('mw-indigo')
  const [coach, setCoach] = React.useState(COACHES[0])
  const [tour, setTour] = React.useState(true)

  React.useEffect(()=>{ if (started) navigate('/', { replace:true }) }, [started, navigate])

  const submit = ()=>{
    if (busy) return; setBusy(true)
    const finalHeya = customHeya.trim() || heyaName
    dispatch({ type:'NEW_GAME', seed: Date.now(), playerName: playerName||'Oyakata', heyaName: finalHeya, crest, mwColor, coach, tour })
    setTimeout(()=> navigate('/', { replace:true }), 0)
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-indigo-900 to-bg">
      <div className="panel max-w-2xl w-full">
        <div className="text-center">
          <div className="text-3xl font-black tracking-wide">Basho</div>
          <div className="text-sm text-muted">Sumo Stable Management</div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 p-3">
            <div className="text-sm font-semibold">You</div>
            <input value={playerName} onChange={e=> setPlayerName(e.target.value)} placeholder="Your name (oyakata)" className="mt-2 w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-sm"/>
            <div className="text-sm font-semibold mt-3">Heya</div>
            <select value={heyaName} onChange={e=> setHeyaName(e.target.value)} className="mt-1 w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-sm">
              {SUGGESTED.map(x=> <option key={x} value={x}>{x}</option>)}
            </select>
            <input value={customHeya} onChange={e=> setCustomHeya(e.target.value)} placeholder="Or enter custom heya" className="mt-2 w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-sm"/>
          </div>

          <div className="rounded-xl border border-white/10 p-3">
            <div className="text-sm font-semibold">Theme</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {CRESTS.map(c=> (
                <button key={c} onClick={()=> setCrest(c)} className={'btn ' + (crest===c?'primary':'ghost')}>{c}</button>
              ))}
            </div>
            <div className="text-sm font-semibold mt-3">Mawashi color</div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {COLORS.map(c=> (
                <button key={c} onClick={()=> setMwColor(c)} className={'btn ' + (mwColor===c?'primary':'ghost')}>{c.replace('mw-','')}</button>
              ))}
            </div>
            <div className="text-sm font-semibold mt-3">Starting coach</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {COACHES.map(c=> <button key={c} className={'btn ' + (coach===c?'primary':'ghost')} onClick={()=> setCoach(c)}>{c}</button>)}
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={tour} onChange={e=> setTour(e.target.checked)} />
              Show guided tour after start
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button className="primary" disabled={busy} onClick={submit}>{busy?'Creating World…':'Start Game'}</Button>
        </div>
      </div>
    </div>
  )
}
