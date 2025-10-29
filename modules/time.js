
import basho from '../data/basho.json' assert { type: 'json' };
export function toDateString(world){ const d=new Date(world.year, world.month-1, world.day); return d.toDateString(); }
export function addDays(world,n=1){ const d=new Date(world.year, world.month-1, world.day); d.setDate(d.getDate()+n); world.year=d.getFullYear(); world.month=d.getMonth()+1; world.day=d.getDate(); return world; }
export function addWeek(world){ return addDays(world,7); }
export function nextBashoStartAfter(world){ const months=basho.map(b=>b.month).sort((a,b)=>a-b); for (let m of months){ if (m>world.month) return {year:world.year, month:m, day:1}; } return {year:world.year+1, month:months[0], day:1}; }
