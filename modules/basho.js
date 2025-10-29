
import basho from '../data/basho.json' assert { type: 'json' };
export function currentBasho(world){ return basho.find(b=>b.month===world.month)||null; }
export function scheduleFor(world){ const cur=currentBasho(world); if(!cur) return []; const day=world.day; const bouts=[]; for(let i=0;i<8;i++){ bouts.push({ id:`${cur.id}-${day}-${i+1}`, east:`E${i+1}`, west:`W${i+1}`, dohyo:cur.city }); } return bouts; }
