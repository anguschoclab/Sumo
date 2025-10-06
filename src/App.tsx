
import React from 'react'
import AppShell from './ui/AppShell'
import RoutesView from './ui/routes'
import DecisionCenter from './ui/Decisions/Center'
import RivalryModal from './ui/Rivalries/RivalryModal'

export default function App(){
  return (
    <AppShell>
      <RoutesView/>
      <RivalryModal/>
      <DecisionCenter/>
    </AppShell>
  )
}
