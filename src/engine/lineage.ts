import { World, Rikishi, LineageEdge } from './types'

export function ensureLineage(world: World){
  if(!world.lineage) world.lineage = []
  return world.lineage
}

export function assignMentor(world: World, mentee: Rikishi, mentor: Rikishi){
  if(mentee.id===mentor.id) return 'Cannot mentor self.'
  ensureLineage(world)
  // remove previous mentor link if any
  if(mentee.mentorId){
    world.lineage = (world.lineage||[]).filter(e => !(e.menteeId===mentee.id))
  }
  mentee.mentorId = mentor.id
  mentor.menteeIds = mentor.menteeIds || []
  if(!mentor.menteeIds.includes(mentee.id)) mentor.menteeIds.push(mentee.id)
  world.lineage!.push({ mentorId: mentor.id, menteeId: mentee.id, sinceWeek: world.week })
  return `${mentor.shikona} is now mentoring ${mentee.shikona}.`
}

export function getMentor(world: World, r: Rikishi){
  return world.heyas.flatMap(h=>h.rikishi).find(x=> x.id===r.mentorId)
}

export function menteesOf(world: World, r: Rikishi){
  const ids = r.menteeIds || []
  return world.heyas.flatMap(h=>h.rikishi).filter(x=> ids.includes(x.id))
}
