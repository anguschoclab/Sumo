import { World } from './types'
export function generatePreBashoPreview(world: World){
  const total = world.heyas.reduce((n,h)=>n+h.rikishi.length,0)
  const heya = world.heyas[Math.floor(Math.random()*world.heyas.length)]
  return { title:'Pre‑Basho Preview', lines:[`Total active rikishi: ${total}`, `Eyes on ${heya.name} heya after strong blocks.`, `Watchlist: ozeki pressure & dark‑horse upsets.`] }
}
export function generatePostBashoReview(world: World){
  const heya = world.heyas[Math.floor(Math.random()*world.heyas.length)]
  return { title:'Post‑Basho Review', lines:[`${heya.name} impressed across divisions.`, `Bout of the Basho: dramatic yorikiri at the edge.`, `Expect banzuke movement.`] }
}
