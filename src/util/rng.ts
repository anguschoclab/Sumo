
export function LCG(seed:number){ let s=seed>>>0; return ()=> (s=(s*1664525+1013904223)>>>0)/2**32; }
