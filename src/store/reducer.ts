
import { generateUniverse } from '@/game/generateUniverse'

const initial:any = {
  flags: {},
  calendar: { todayISO: '2026-01-01', phase: 'between_basho', nextBashoStartISO: '2026-02-12' },
  news: [], events: [], rikishi: [], heya: [], ui: { decisions: [], banners: [] }, rivalries: { rikishi: [] }
}
function clone(x:any){ return JSON.parse(JSON.stringify(x)) }
function addDays(iso:string, days:number){ const d=new Date(iso); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10) }

export function reducer(state=initial, action:any){
  switch(action.type){
    case 'NEW_GAME': {
      const next = clone(initial)
      const world = generateUniverse(action.seed || Date.now(), undefined)
      Object.assign(next, world)
      next.flags.started = true
      next.news.unshift({ id:'n1', headline:'New World Created', bullets:[`Stables: ${next.heya.length}`, `Rikishi: ${next.rikishi.length}`]})
      next.ui.banners.push({ id:'b1', kind:'pre', title:'Pre-Basho Preview', body:'Storylines: title race, promotion watch, dark horses.' })
      return next
    }
    case 'TIME_ADVANCE_WEEK': {
      const next = clone(state)
      next.calendar.todayISO = addDays(state.calendar.todayISO, 7)
      return next
    }
    case 'LOAD_STATE': { return clone(action.world) }
    case 'DECISION_RESOLVE': {
      const next = clone(state)
      next.ui.decisions = (next.ui.decisions||[]).filter((d:any)=> d.id !== action.id)
      next.news.unshift({ id:'n'+Date.now(), headline:'Decision resolved', bullets:[`You chose: ${action.choice}`]})
      return next
    }
    default: return state
  }
}
