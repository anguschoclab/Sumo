
export function predictNextClash(state:any, aId:string, bId:string){
  const cal = state.calendar || { phase:'between_basho', dayOfBasho:1 };
  if (cal.phase==='basho_days' && state.torikumi && state.torikumi.days){
    for (let d=cal.dayOfBasho; d<=15; d++){
      const day = state.torikumi.days[d]; if (!day) continue;
      const match = (day.bouts||[]).find((bt:any)=> [bt.rA, bt.rB].includes(aId) && [bt.rA, bt.rB].includes(bId));
      if (match) return { type:'scheduled', day:d, confidence:0.95 };
    }
  }
  const rankBias=0.6, formBias=0.5;
  const est = Math.round(8 + rankBias*5 + formBias*3);
  const nextDay = Math.max((cal.dayOfBasho||1)+1, est);
  const day = Math.min(15, nextDay);
  const conf = Math.min(0.9, Math.max(0.55, 0.55 + 0.35*(rankBias*0.6 + formBias*0.4)));
  return { type:'estimated', day, confidence:+conf.toFixed(2) };
}
