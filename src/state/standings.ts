type Standing = { rank:number; shikona:string; w:number; l:number };
function pseudo(seed:number){let s=seed>>>0;return()=>((s^=s<<13,s^=s>>>17,s^=s<<5)>>>0)/0xffffffff;}
export function computeStandings(){const names=["Hakuo","KirinoFuji","Daikaze","Kotosho"];const r=pseudo(Date.now());return names.map((n,i)=>({rank:i+1,shikona:n,w:Math.floor(r()*10),l:Math.floor(r()*5)}));}
export function recomputeStandings(){if(typeof window!=='undefined')window.dispatchEvent(new Event('standings:change'));}
