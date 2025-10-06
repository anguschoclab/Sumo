
import { addDays } from '@/game/calendar';

export type RivalryEdge = {
  aId: string; bId: string; scope: 'rikishi'|'stable';
  score: number; heat: number; sinceISO: string; lastISO: string;
  h2h: { aWins:number; bWins:number }; tags: string[]; titleBouts:number;
};

const MAX_SCORE=300, MAX_HEAT=100;
const key = (a:string,b:string)=> a<b ? `${a}|${b}` : `${b}|${a}`;

function getEdge(list:RivalryEdge[], a:string, b:string, scope:'rikishi'|'stable', today:string){
  const k = key(a,b);
  let e = list.find(x=> key(x.aId,x.bId)===k);
  if (!e){
    e = { aId: a<b?a:b, bId: a<b?b:a, scope, score:0, heat:0, sinceISO: today, lastISO: today, h2h:{aWins:0,bWins:0}, tags:[], titleBouts:0 };
    list.push(e);
  }
  return e;
}

export function bumpRivalryAfterBout(state:any, opts:any){
  const rs = (state.rivalries ??= { rikishi:[], stable:[] });
  const { rikishiA, rikishiB, winnerId, zabuton, upset, controversy, titleImpact, heyaA, heyaB, todayISO } = opts;

  const rEdge = getEdge(rs.rikishi, rikishiA, rikishiB, 'rikishi', todayISO);
  const aIsWinner = (winnerId===rEdge.aId);
  let base=10; if (upset) base+=8; if (zabuton) base+=6; if (controversy) base+=6; if (titleImpact) base+=10;

  rEdge.score = Math.min(MAX_SCORE, rEdge.score + base);
  rEdge.heat = Math.min(MAX_HEAT, rEdge.heat + Math.round(base/2));
  rEdge.lastISO = todayISO;
  rEdge.h2h[aIsWinner ? 'aWins' : 'bWins']++;
  if (upset && !rEdge.tags.includes('upset-chain')) rEdge.tags.push('upset-chain');
  if (zabuton && !rEdge.tags.includes('zabuton')) rEdge.tags.push('zabuton');
  if (controversy && !rEdge.tags.includes('controversy')) rEdge.tags.push('controversy');
  if (titleImpact){ rEdge.titleBouts++; if (!rEdge.tags.includes('title-race')) rEdge.tags.push('title-race'); }
}

export function decayRivalries(state:any, todayISO:string, factor=1){
  const rs = (state.rivalries ??= { rikishi:[], stable:[] });
  for (const e of rs.rikishi){
    const dd = 3*factor; const ds = 2*factor;
    e.heat = Math.max(0, Math.round(e.heat - dd));
    e.score = Math.max(0, Math.round(e.score - ds));
  }
  for (const e of rs.stable){
    const dd = 3*factor; const ds = 2*factor;
    e.heat = Math.max(0, Math.round(e.heat - dd));
    e.score = Math.max(0, Math.round(e.score - ds));
  }
}

export function rivalryRank(e:RivalryEdge){
  return e.score + e.heat*1.25 + e.titleBouts*8 + (e.tags.includes('controversy')?5:0);
}
