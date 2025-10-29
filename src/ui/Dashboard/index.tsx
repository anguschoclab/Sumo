
import React from 'react'
import RivalryWidget from '@/ui/Rivalries/RivalryWidget'
import { Link } from 'react-router-dom'
import InstallButton from '@/ui/PWA/InstallButton'
export default function Dashboard(){
  return (
    <div className="p-4 grid gap-4">
      <div className="flex gap-2 items-center">
        <Link to="/news" className="btn">News</Link>
        <Link to="/rivalries" className="btn">Rivalries</Link>
        <div className="flex-1" />
        <InstallButton/>
      </div>
      <RivalryWidget/>
    </div>
  )
}
