import { World, Rikishi, Rivalry } from './types'

function key(a:string,b:string){ return a<b? a+'__'+b : b+'__'+a }

export function ensureRivalries(world: World){
  if(!world.rivalries) world.rivalries = []
  return world.rivalries
}

export function bumpRivalry(world: World, a:Rikishi, b:Rikishi, delta=8){
  if(a.id===b.id) return
  const list = ensureRivalries(world)
  const k = key(a.id,b.id)
  let rv = list.find(r => key(r.aId,r.bId)===k)
  if(!rv){
    rv = { aId:a.id, bId:b.id, heat: 10, meetings: 0, lastWeek: world.week }
    list.push(rv)
  }
  rv.heat = Math.min(100, rv.heat + delta)
  rv.meetings += 1
  rv.lastWeek = world.week
}

export function decayRivalries(world: World){
  const list = ensureRivalries(world)
  for(const rv of list){
    const weeks = Math.max(0, world.week - rv.lastWeek)
    if(weeks>0){
      rv.heat = Math.max(0, rv.heat - Math.min(5, weeks)) // decay up to 5 per dormant week
    }
  }
  // prune cold
  world.rivalries = list.filter(r => r.heat>0 || r.meetings>0)
}

export function topRivalryFor(world: World, r: Rikishi){
  const list = ensureRivalries(world)
  const mine = list.filter(x => x.aId===r.id || x.bId===r.id)
  if(mine.length===0) return null
  mine.sort((m,n)=> n.heat - m.heat)
  const top = mine[0]
  const otherId = top.aId===r.id? top.bId : top.aId
  const other = world.heyas.flatMap(h=>h.rikishi).find(x=>x.id===otherId)
  return { other, heat: top.heat, meetings: top.meetings }
}

// Lightweight auto-formation during a "week" tick
export function simulateRivalryInteractions(world: World){
  const all = world.heyas.flatMap(h=>h.rikishi)
  if(all.length<2) return
  // pick a handful of random pairs each week to simulate training bouts or media spats
  const attempts = Math.min(8, Math.floor(all.length/4))
  for(let i=0;i<attempts;i++){
    const a = all[Math.floor(Math.random()*all.length)]
    let b = all[Math.floor(Math.random()*all.length)]
    if(a.id===b.id) continue
    // bigger chance if same division
    const bonus = (a.rank.division===b.rank.division)? 6: 0
    bumpRivalry(world, a, b, 4+bonus/2)
  }
  decayRivalries(world)
}
