import { World, Rikishi, ScoutNote } from './types'

export function ensureScouting(world: World){
  if(!world.scouting) world.scouting = []
  return world.scouting
}

export function addScoutNote(world: World, r: Rikishi, note: string, conf=0.7){
  const list = ensureScouting(world)
  const entry: ScoutNote = { rikishiId: r.id, week: world.week, note, confidence: Math.max(0,Math.min(1,conf)), freshness: 0 }
  list.unshift(entry)
  return entry
}

const hints = [
  'Prefers left-hand inside grip.',
  'Telegraphs the tachiai on big bouts.',
  'Struggles vs shorter oshi specialists.',
  'Excellent ring awareness near tawara.',
  'Prone to shoulder tweaks late in basho.',
  'Better on Day 1–5 than 10–15.',
  'High stamina; fatigue recovers quickly.',
  'Weak nodowa defense.',
  'Strong uwatenage finishers.',
  'Footwork improves after early loss.'
]

export function quickScout(world: World, r: Rikishi){
  const note = hints[Math.floor(Math.random()*hints.length)]
  const conf = 0.6 + Math.random()*0.35
  return addScoutNote(world, r, note, conf)
}

export function tickScouting(world: World){
  const list = ensureScouting(world)
  for(const s of list){
    s.freshness += 1
    // slight confidence fade with staleness
    s.confidence = Math.max(0.3, s.confidence - 0.01)
  }
  // prune super stale
  world.scouting = list.slice(0,200)
}
