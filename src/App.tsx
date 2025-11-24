
import React, { useEffect, useMemo, useState } from 'react'
import HeaderBar from '@components/HeaderBar'
import FTUE from '@components/FTUE'
import BashoStandings from '@components/BashoStandings'
import MatchView from '@components/MatchView'
import { useWorld } from '@engine/world'
import { toDateString } from '@engine/time'
import { flags } from '@state/flags'
import { getAnnualBashoSchedule, currentBashoMonth } from '@engine/basho'

type Profile = { player: string, heya: string }

function loadProfile(): Profile | null {
  try { const raw = localStorage.getItem('profile'); return raw ? JSON.parse(raw) as Profile : null } catch { return null }
}
function saveProfile(p: Profile) {
  localStorage.setItem('profile', JSON.stringify(p))
}

export default function App() {
  const w = useWorld()
  const [profile, setProfile] = useState<Profile | null>(loadProfile())

  useEffect(()=>{
    if (!profile && flags.enableFTUE) {
      // stay in FTUE until completed
    }
  }, [profile])

  const schedule = useMemo(()=> getAnnualBashoSchedule(w.year), [w.year])
  const isBashoMonth = currentBashoMonth(w) !== null

  const standingsRows = useMemo(()=>{
    // Demo rows for Sprint K
    return [
      { rank:'Y1e', shikona:'Hakuo', wins:10, losses:2 },
      { rank:'O1w', shikona:'Kirinofuji', wins:9, losses:3 },
      { rank:'S1e', shikona:'Daikaze', wins:8, losses:4 },
      { rank:'M1w', shikona:'Kotosho', wins:7, losses:5 },
    ]
  }, [w.month])

  const bouts = useMemo(()=>{
    return [
      { east:'Hakuo', west:'Kirinofuji', dohyo:'Ryogoku', time:'Day 12 • 16:45', result: isBashoMonth ? '—' : 'N/A' },
      { east:'Daikaze', west:'Kotosho', dohyo:'Ryogoku', time:'Day 12 • 16:30', result: isBashoMonth ? '—' : 'N/A' },
    ]
  }, [isBashoMonth])

  if (!profile && flags.enableFTUE) {
    return (
      <div style={{padding: '1rem', maxWidth: 1100, margin: '0 auto'}}>
        <HeaderBar />
        <FTUE onComplete={(player, heya)=>{ const p={player, heya}; setProfile(p); saveProfile(p) }} />
        <div className="card">
          <h3>About this Build</h3>
          <p className="muted">Vite baseline v0.3.2 (Sprint K): Basho schedule + standings view + match UI shell.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{padding: '1rem', maxWidth: 1100, margin: '0 auto'}}>
      <HeaderBar />
      <div className="row">
        <div className="card" style={{flex:'1 1 320px'}}>
          <h3 style={{marginTop:0}}>Dashboard</h3>
          <div className="muted">Date: {toDateString(w)}</div>
          <div style={{marginTop:'.5rem'}}>
            <span className="pill">Player: {profile?.player}</span>
            <span className="pill" style={{marginLeft:'.5rem'}}>Heya: {profile?.heya}</span>
          </div>
        </div>

        <div className="card" style={{flex:'1 1 320px'}}>
          <h3 style={{marginTop:0}}>Basho Schedule ({w.year})</h3>
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {schedule.map((b, i)=>(
              <li key={i} style={{padding:'.35rem 0', borderTop:'1px solid #2e3447'}}>
                <strong>{b.name}</strong> — Month {b.month} • {b.location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {flags.enableBasho && (
        <div className="row" style={{marginTop:'.75rem'}}>
          <div style={{flex:'1 1 420px'}}><BashoStandings rows={standingsRows}/></div>
          <div style={{flex:'1 1 420px'}}><MatchView todaysBouts={bouts}/></div>
        </div>
      )}
    </div>
  )
}
