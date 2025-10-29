
import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from '@/ui/Layout/Shell'
import ErrorBoundary from '@/ui/ErrorBoundary'
import { useSelector } from 'react-redux'

const StartScreen = lazy(()=> import('@/ui/Start/StartScreen'))
const Dashboard = lazy(()=> import('@/ui/Dashboard'))
const NewsFeed = lazy(()=> import('@/ui/News'))
const DirectoryPage = lazy(()=> import('@/ui/Directory'))
const RivalriesPage = lazy(()=> import('@/ui/Rivalries'))
const DecisionsPage = lazy(()=> import('@/ui/Decisions'))
const BanzukePage = lazy(()=> import('@/ui/Banzuke'))

function Guarded({ children }:{ children:React.ReactNode }){
  const started = useSelector((s:any)=> !!s.flags?.started)
  if (!started) return <Navigate to="/start" replace />
  return <>{children}</>
}

export default function RoutesView(){
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4 text-sm text-muted">Loading…</div>}>
        <Routes>
          <Route path="/start" element={<StartScreen/>}/>
          <Route path="/" element={<Guarded><Shell><Dashboard/></Shell></Guarded>}/>
          <Route path="/news" element={<Guarded><Shell><NewsFeed/></Shell></Guarded>}/>
          <Route path="/banzuke" element={<Guarded><Shell><BanzukePage/></Shell></Guarded>}/>
          <Route path="/directory" element={<Guarded><Shell><DirectoryPage/></Shell></Guarded>}/>
          <Route path="/rivalries" element={<Guarded><Shell><RivalriesPage/></Shell></Guarded>}/>
          <Route path="/decisions" element={<Guarded><Shell><DecisionsPage/></Shell></Guarded>}/>
          <Route path="*" element={<Navigate to="/start" replace />}/>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
