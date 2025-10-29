
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RMenu, Button } from '@/ui/_ds'
import { SumoIcon } from '@/ui/_ds/SumoIcon'
import { useDispatch, useSelector } from 'react-redux'
import { quicksave, quickload } from '@/utils/SaveManager'
import SaveLoadModal from '@/ui/Modals/SaveLoad'

export default function Shell({ children }:{ children: React.ReactNode }){
  const nav = useNavigate(); const loc = useLocation()
  const d = useDispatch(); const world = useSelector((s:any)=>s)
  const [saveOpen, setSaveOpen] = React.useState(false)

  const link = (to:string, label:string, icon:React.ReactNode) => (
    <NavLink to={to} end className={({isActive})=>[
      'px-3 py-2 rounded-lg flex items-center gap-2',
      isActive?'bg-white/10 text-white':'text-muted hover:bg-white/5'
    ].join(' ')}>{icon}<span>{label}</span></NavLink>
  )

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[56px_1fr]" style={{gridTemplateAreas:'"side top" "side main"'}}>
      <aside className="bg-panel border-r border-white/10 p-3" style={{gridArea:'side'}}>
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent/20 to-accent2/10 px-3 py-2">
          <div className="size-7 rounded-md bg-gradient-to-br from-accent to-indigo-900 grid place-items-center font-black">力</div>
          <div>
            <div className="font-extrabold leading-tight banzuke-title">Basho</div>
            <div className="text-[11px] text-muted -mt-0.5">Sumo Stable Management</div>
          </div>
        </div>
        <nav className="mt-3 grid gap-1 text-sm">
          {link('/', 'Dashboard', <SumoIcon name='torii'/>)}
          {link('/news', 'News', <SumoIcon name='taiko'/>)}
          {link('/banzuke', 'Banzuke', <SumoIcon name='rope'/>)}
          {link('/directory', 'People', <SumoIcon name='mawashi'/>)}
          {link('/rivalries', 'Rivalries', <SumoIcon name='gunbai'/>)}
          {link('/decisions', 'Decisions', <SumoIcon name='rope'/>)}
        </nav>
      </aside>
      <header className="backdrop-blur bg-white/5 border-b border-white/10 flex items-center gap-2 px-3" style={{gridArea:'top'}}>
        <div className="text-xs text-muted">Route: {loc.pathname}</div>
        <div className="flex-1" />
        <RMenu.Root>
          <RMenu.Trigger asChild><Button className="ghost">Menu ▾</Button></RMenu.Trigger>
          <RMenu.Content className="panel absolute right-3 top-10">
            <RMenu.Item className="px-3 py-1.5 rounded hover:bg-white/5 cursor-pointer" onSelect={()=> { quicksave(world); }}>Quicksave</RMenu.Item>
            <RMenu.Item className="px-3 py-1.5 rounded hover:bg-white/5 cursor-pointer" onSelect={()=> { const w=quickload(); if (w) d({ type:'LOAD_STATE', world:w }) }}>Quickload</RMenu.Item>
            <RMenu.Separator className="my-1 border-t border-white/10"/>
            <RMenu.Item className="px-3 py-1.5 rounded hover:bg-white/5 cursor-pointer" onSelect={()=> setSaveOpen(true)}>Save / Load…</RMenu.Item>
            <RMenu.Item className="px-3 py-1.5 rounded hover:bg-white/5 cursor-pointer" onSelect={()=> nav('/start')}>Quit to Start</RMenu.Item>
          </RMenu.Content>
        </RMenu.Root>
      </header>
      <main className="p-4 grid gap-3" style={{gridArea:'main'}}>{children}</main>
      <SaveLoadModal open={saveOpen} onOpenChange={setSaveOpen}/>
    </div>
  )
}
