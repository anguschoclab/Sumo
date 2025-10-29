
import React from 'react';
import { useParams, Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CareerHonorsTab from './CareerHonorsTab';
import { Card } from '@/ui/primitives';
export default function RikishiPage(){
  const { id } = useParams();
  const r = useSelector((s:any)=> (s.rikishi||[]).find((x:any)=> x.id===id));
  const tab = new URLSearchParams(useLocation().search).get('tab') || 'honors';
  if (!r){
    return (
      <Card className="m-4 grid place-items-center py-10 text-center">
        <div className="text-sm text-slate-600">Rikishi not found.</div>
        <Link to="/" className="btn mt-2">Back to Dashboard</Link>
      </Card>
    );
  }
  return (
    <div className="p-4 grid gap-3">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{r.shikona}{r.shikonaKanji && <span className="ml-2 text-slate-500">{r.shikonaKanji}</span>}</div>
            <div className="text-[12px] text-slate-600">{r.rankTitle || r.division} • {r.heyaShort || r.heyaName || '—'}</div>
          </div>
          <Link to="/news" className="btn">News</Link>
        </div>
        <div className="mt-3 flex gap-2">
          <TabLink id={r.id} name="honors" label="Career Honors" active={tab==='honors'} />
        </div>
      </Card>
      {tab==='honors' && <CareerHonorsTab rikishiId={r.id} />}
    </div>
  );
}
function TabLink({ id, name, label, active }:{ id:string; name:string; label:string; active:boolean }){
  return (
    <NavLink to={`/rikishi/${encodeURIComponent(id)}?tab=${encodeURIComponent(name)}`} className={`btn ${active?'primary':''}`}>
      {label}
    </NavLink>
  );
}
