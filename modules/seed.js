
import names from '../data/names.json' assert { type: 'json' };
import { makeShikona, makeCivilName } from './shikona.js';
export function seedWorld(world){
  const heyas = ['Shioyama-beya','Kasuga-beya','Matsuda-beya','Nagomi-beya'];
  world.heyas = heyas.map(h => ({ name:h, prestige: Math.floor(Math.random()*50)+50 }));
  const pool=[];
  for(let i=0;i<32;i++){
    pool.push({ id:'RK'+(1000+i), shikona: makeShikona(names), name: makeCivilName(names), heya: heyas[i%heyas.length],
      rank: ['M','J','S','K','O','Y'][Math.floor(Math.random()*6)], power:40+Math.floor(Math.random()*60),
      speed:40+Math.floor(Math.random()*60), technique:40+Math.floor(Math.random()*60), form:40+Math.floor(Math.random()*60) });
  }
  world.rikishi = pool;
  const ph = world.player.heya || 'Shioyama-beya';
  world.player.roster = pool.filter(r => r.heya===ph).slice(0,3);
  world.events.push({ ts:Date.now(), kind:'news', text:'Welcome to the dohyo. First basho begins soon.' });
  return world;
}
