import React from 'react'
import { Start } from './Start'
import { Dashboard } from './Dashboard'
import { useGame } from './store'
import { SaveModal } from './SaveModal'

export function App(){
  const started = useGame(s=>s.started)
  return <>{started? <Dashboard/> : <Start/>}<SaveModal/></>
}
