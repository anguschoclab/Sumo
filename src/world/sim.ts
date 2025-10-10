import type { Universe, Rikishi } from '@/types'
import { KIMARITE } from './kimarite82'

function advantage(a:Rikishi,b:Rikishi){
  const sweet = (w:number)=> (w<150? -0.05 : w>237? -0.08 : 0.1)
  const size = sweet(a.weightKg)-sweet(b.weightKg)
  const style = (a.style.oshizumo-b.style.oshizumo)*0.2 + (a.style.yotsuzumo-b.style.yotsuzumo)*0.2
  const ag = (a.style.agility-b.style.agility)*0.1
  return size+style+ag
}

function pickKimarite(){
  return KIMARITE[Math.floor(Math.random()*KIMARITE.length)]
}

export function simDay(u:Universe):Universe{
  const list = [...u.rikishi]
  list.sort((a,b)=> a.rank.localeCompare(b.rank))
  const upd = list.map(r=>({...r}))
  for (let i=0;i<upd.length;i+=2){
    const a = upd[i], b = upd[i+1]; if(!a||!b) continue
    const p = 1/(1+Math.exp(-3*advantage(a,b)))
    const aWins = Math.random()<p
    const winner = aWins? a:b, loser = aWins? b:a
    const k = pickKimarite()
    winner.record.career.wins++
    loser.record.career.losses++
    const flavor = `${winner.shikona} wins by ${k.name}. ${loser.shikona} bows and exits the tawara.`
    a.lastBout = b.lastBout = { winnerId:winner.id, loserId:loser.id, kimarite:k.id, aftermath:flavor }
  }
  return { ...u, rikishi: upd, day: u.day+1 }
}
