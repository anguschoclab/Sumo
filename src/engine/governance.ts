import { World, Rikishi } from './types'

export function councilDeliberation(world: World){
  const note = `Council met (week ${world.week}). Reviewed ozeki/yokozuna cases.`
  world.councilNotes.unshift(note)
  if(world.councilNotes.length>8) world.councilNotes.pop()
}

export function promotionReview(world: World){
  // Mock: pick a top Makuuchi with good form to promote to Ozeki/Yokozuna
  const top = world.heyas.flatMap(h=>h.rikishi)
    .filter(r=>r.rank.division==='Makuuchi' && !r.injured)
    .sort((a,b)=> (b.form - a.form) || (a.rank.rank - b.rank.rank))[0]
  if(!top) return 'No candidates this week.'
  if(top.title==='ozeki' && top.form>=2){
    top.title='yokozuna'; top.kadoban=false; return `${top.shikona} promoted to Yokozuna!`
  }else if(top.title==='none' && top.form>=2 && top.rank.rank<=3){
    top.title='ozeki'; top.kadoban=false; return `${top.shikona} promoted to Ōzeki.`
  }else if(top.title==='ozeki' && top.form<=-2){
    top.kadoban = true; return `${top.shikona} placed on kadoban.`
  }else if(top.title==='yokozuna' && top.form<=-2){
    top.retireWatch = true; return `${top.shikona} under retirement watch.`
  }
  return 'Deliberation recorded. No changes.'
}

export function yokozunaCandidates(world: World){
  // candidates: top-tier Makuuchi with high form who are not yet yokozuna
  return world.heyas.flatMap(h=>h.rikishi)
    .filter(r=>r.rank.division==='Makuuchi' && r.title!=='yokozuna' && r.form>=2 && r.rank.rank<=5)
    .slice(0,8)
}
