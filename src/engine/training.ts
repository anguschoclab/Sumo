import { World, Heya, TrainingPlan } from './types'
import { simulateBasho } from './tournaments'
import { simulateRivalryInteractions } from './rivalries'
import { tickScouting } from './scouting'

export function setTrainingPlan(heya: Heya, plan: TrainingPlan){ heya.training = plan }
export function advanceWeek(world: World){
  world.week += 1
  if(!('bashoId' in world)) (world as any).bashoId = 1
  const YOUTH_RATE=0.05
  for(const h of world.heyas){
    const plan = h.training ?? { focus:'balance', intensity:1 }
    for(const r of h.rikishi){
      const load = plan.intensity===2?10:plan.intensity===1?6:3
      const recov = plan.focus==='recovery'?8:3
      const mentorBonus = r.mentorId ? 1 : 0
      r.fatigue = Math.max(0, Math.min(100, r.fatigue + load - recov - mentorBonus))
      let drift=0; if(plan.focus==='technique')drift+=0.2; if(plan.focus==='power')drift+=0.1; if(plan.focus==='balance')drift+=0.1; if(plan.focus==='recovery')drift-=0.1
      drift += (Math.random()-0.5)*0.4 + (r.mentorId?0.05:0)
      r.form = Math.max(-3, Math.min(3, r.form + drift))
      const heavy = Math.max(0,(r.weightKg-180)/40); const risk = 0.01 + heavy*0.02 + (plan.intensity===2?0.02:plan.intensity===1?0.01:0)
      if(!r.injured && Math.random()<risk){ r.injured=true; r.injury={type:(['knee','shoulder','back'] as const)[Math.floor(Math.random()*3)], severity:(Math.random()<0.6?1:(Math.random()<0.8?2:3))} }
      if(r.injured && Math.random()<0.1){ r.injured=false; r.injury=undefined; r.fatigue=Math.max(0,r.fatigue-10) }
    }
    if(Math.random()<YOUTH_RATE){
      h.rikishi.push({ id:'y_'+Math.random().toString(36).slice(2,10), shikona:'Shin'+Math.random().toString(36).slice(2,5)+'no',
        weightKg:120+Math.round(Math.random()*30), heightCm:175+Math.round(Math.random()*10),
        style:(['oshi','yotsu','agility','grit'] as const)[Math.floor(Math.random()*4)],
        hometown:'Academy', rank:{division:'Jonokuchi', rank:30, side:'East'}, title:'none', fatigue:10, form:0 })
    }
  }
  // Sprint F hooks
  simulateRivalryInteractions(world)
  tickScouting(world)

  if(world.week % 6 === 0){
    simulateBasho(world)
    ;(world as any).bashoId += 1
  }
}
