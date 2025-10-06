
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NewsFeed from './News/NewsFeed'
import RivalriesPage from './Rivalries/RivalriesPage'
import BoutPage from './Bout/BoutPage'
import Dashboard from './Dashboard'
import StartScreen from './Start/StartScreen'
import RikishiPage from './Rikishi/RikishiPage'
import { useSelector } from 'react-redux'
function Guarded({ children }:{ children: React.ReactNode }){
  const started = useSelector((s:any)=> !!s.flags?.started)
  if (!started) return <Navigate to="/start" replace />
  return <>{children}</>
}
export default function RoutesView(){
  return (
    <Routes>
      <Route path="/start" element={<StartScreen/>}/>
      <Route path="/" element={<Guarded><Dashboard/></Guarded>}/>
      <Route path="/news" element={<Guarded><NewsFeed/></Guarded>}/>
      <Route path="/rivalries" element={<Guarded><RivalriesPage/></Guarded>}/>
      <Route path="/rikishi/:id" element={<Guarded><RikishiPage/></Guarded>}/>
      <Route path="/basho/:bashoId/bout/:eventId" element={<Guarded><BoutPage/></Guarded>}/>
      <Route path="*" element={<Navigate to="/start" replace />}/>
    </Routes>
  )
}
