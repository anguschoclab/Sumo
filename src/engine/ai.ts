import { World, Heya, Rikishi } from './types'
import { pushEvent } from './events'
import { ensureRivalries } from './rivalries'

function heyaScore(h: Heya){
  const count = h.rikishi.length
  const avgForm = h.rikishi.reduce((s,r)=> s+(r.form||0), 0)/(count||1)
  const injuries = h.rikishi.filter(r=>r.injured).length
  return avgForm - injuries*0.5 + Math.min(0, 6-count)
}

function pickTradePair(world: World): [Heya, Heya] | null{
  if(world.heyas.length<2) return null
  const sorted = world.heyas.slice().sort((a,b)=> heyaScore(a)-heyaScore(b))
  const weak = sorted[0]
  const strong = sorted[sorted.length-1]
  if(weak===strong) return null
  if(heyaScore(strong)-heyaScore(weak) < 1) return null
  return [weak, strong]
}

function candidate(r: Rikishi){ return !r.injured && (r.title==='none') }

export function simulateAITrades(world: World){
  if(Math.random()<0.5) return
  const pair = pickTradePair(world)
  if(!pair) return
  const [weak, strong] = pair
  const give = strong.rikishi.find(candidate)
  const take = weak.rikishi.find(candidate)
  if(!give || !take) return

  strong.rikishi = strong.rikishi.filter(r=>r.id!==give.id); weak.rikishi.push(give)
  weak.rikishi = weak.rikishi.filter(r=>r.id!==take.id); strong.rikishi.push(take)

  pushEvent({ week: world.week, kind:'trade', text:`${strong.name} traded ${give.shikona} to ${weak.name} for ${take.shikona}`, aId: give.id, bId: take.id })

  const rivalries = ensureRivalries(world)
  const heat = 4 + Math.round(Math.random()*3)
  rivalries.push({ aId: give.id, bId: take.id, heat, meetings: 0, lastWeek: world.week } as any)
}
