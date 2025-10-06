
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import NewsFeed from './News/NewsFeed'
import RivalriesPage from './Rivalries/RivalriesPage'
import BoutPage from './Bout/BoutPage'
import Dashboard from './Dashboard'

export default function RoutesView(){
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/news" element={<NewsFeed/>}/>
      <Route path="/rivalries" element={<RivalriesPage/>}/>
      <Route path="/basho/:bashoId/bout/:eventId" element={<BoutPage/>}/>
      <Route path="*" element={<div className="p-6"><Link to="/" className="btn">Back to Dashboard</Link></div>} />
    </Routes>
  )
}
