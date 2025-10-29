import type { Rikishi } from './types'
import { KIMARITE_82 } from './kimarite82'
export type BoutResult={winner:Rikishi,loser:Rikishi,kimarite:string}
function rnorm(mean:number,stdev:number){const u=1-Math.random();const v=1-Math.random();const z=Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI*v);return mean+z*stdev}
export function fight(a:Rikishi,b:Rikishi):BoutResult{
  const styleBias=(r:Rikishi)=>r.style==='oshi'?6:r.style==='yotsu'?5:r.style==='grit'?4:3
  const scoreA=rnorm(a.weightKg/25+styleBias(a),3)
  const scoreB=rnorm(b.weightKg/25+styleBias(b),3)
  const winner=scoreA>=scoreB?a:b; const loser=winner===a?b:a
  const kimarite=KIMARITE_82[Math.floor(Math.random()*KIMARITE_82.length)]
  return { winner, loser, kimarite }
}
