import type { Universe, Rikishi, Division, Rank, Side } from '@/types'

const HEYA = ['Miyagino','Isegahama','Kokonoe','Dewanoumi','Takasago','Oitekaze','Sadogatake']
const JP_PREFS = ['Tokyo','Hokkaido','Aichi','Osaka','Fukuoka','Miyagi','Ishikawa','Kumamoto']
const FLAGS = [['🇯🇵'], ['🇲🇳'], ['🇺🇸'], ['🇬🇪'], ['🇧🇬']]
const rand = (s:number)=>()=> (s = (s*48271)%0x7fffffff, s/0x7fffffff)
function pick<T>(rnd:()=>number, arr:T[]):T{ return arr[Math.floor(rnd()*arr.length)] }

export function generateUniverse(seed:number, playerName:string, playerHeya:string): Universe{
  const r = rand(seed)
  const rikishi:Rikishi[] = []
  let id=0
  const divisions:Division[] = ['Makuuchi','Juryo','Makushita','Sandanme','Jonidan','Jonokuchi']
  const ranksByDiv:Record<Division,string> = {
    Makuuchi:'Maegashira', Juryo:'Juryo', Makushita:'Makushita', Sandanme:'Sandanme', Jonidan:'Jonidan', Jonokuchi:'Jonokuchi'
  }
  for (let i=0;i<36;i++){
    const div = pick(r, divisions)
    const rank = `${ranksByDiv[div]} ${1+Math.floor(r()*15)}` as Rank
    const side:Side = (i%2===0)?'East':'West'
    const flags = (r()<0.8)? ['🇯🇵'] : pick(r, FLAGS)
    const rs:Rikishi = {
      id: 'r'+(++id),
      shikona: `Rikishi ${id}`,
      heya: i===0 ? playerHeya : pick(r, HEYA),
      division: div,
      rank,
      side,
      hometown: pick(r, JP_PREFS)+', Japan',
      flags,
      heightCm: 178+Math.floor(r()*24),
      weightKg: 130+Math.floor(r()*130),
      reachCm: 178+Math.floor(r()*20),
      style:{ oshizumo:r(), yotsuzumo:r(), agility:r(), grit:r() },
      favoredKimarite: ['yorikiri','oshidashi','hatakikomi'].slice(0,2+Math.floor(r()*2)),
      fatigue: Math.floor(r()*20),
      morale: 0.5,
      injury: { status:'healthy', knee:0 },
      record: { career: { wins:0, losses:0, draws:0, yusho:0, kachiKoshi:0, makeKoshi:0 }, basho:{} }
    }
    rikishi.push(rs)
  }
  return { seed, day:1, rikishi }
}
