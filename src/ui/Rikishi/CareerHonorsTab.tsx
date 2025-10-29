
import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/ui/primitives';
export default function CareerHonorsTab({ rikishiId }:{ rikishiId:string }){
  const honors = useSelector((s:any)=> s.rikishiHonors?.[rikishiId] || {});
  const rows = Object.entries(honors).sort((a,b)=> (b[1] as number) - (a[1] as number));
  return (
    <Card>
      <div className="text-sm font-semibold">Career Honors</div>
      {rows.length ? (
        <ul className="mt-2 grid gap-2">
          {rows.map(([label, count])=> (
            <li key={label} className="flex items-center justify-between rounded-lg border px-3 py-2">
              <span className="truncate">{label}</span>
              <span className="chip gold">{count}×</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 text-sm text-slate-600">No honors recorded yet.</div>
      )}
    </Card>
  );
}
