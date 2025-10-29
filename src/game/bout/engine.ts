
import { asKimarite, asNonTech } from './enums'

export function pressureScalar(r:any){ return 1.0; }
export function rivalryScalar(state:any, aId:string, bId:string){ return 1.0; }
function computeSizeAdv(wA:number,hA:number,armA:number,wB:number,hB:number,armB:number){
  const mass = (wA - wB) / 200; // -1..1 approx
  const reach = (armA - armB) / 50;
  const height = (hA - hB) / 60;
  return Math.max(0.8, Math.min(1.25, 1 + 0.35*mass + 0.15*reach + 0.10*height));
}

export function resolveBout(state:any, rA:any, rB:any){
  const baseA = 1 + (rA.skill||0.5); const baseB = 1 + (rB.skill||0.5);
  const wA = Number(rA.physique?.weightKg) || 150; const wB = Number(rB.physique?.weightKg) || 150;
  const hA = Number(rA.physique?.heightCm) || 180; const hB = Number(rB.physique?.heightCm) || 180;
  const armA = Number(rA.physique?.reachCm) || Math.round(hA*0.46);
  const armB = Number(rB.physique?.reachCm) || Math.round(hB*0.46);

  const sizeAdv = computeSizeAdv(wA,hA,armA,wB,hB,armB);
  const scalarA = Number.isFinite(sizeAdv) ? sizeAdv : 1;
  const scalarB = 1 / scalarA;

  let effA = Math.max(0.0001, baseA * scalarA * pressureScalar(rA) * rivalryScalar(state,rA.id,rB.id));
  let effB = Math.max(0.0001, baseB * scalarB * pressureScalar(rB) * rivalryScalar(state,rB.id,rA.id));

  let pA = effA / (effA + effB);
  pA = Math.min(0.995, Math.max(0.005, pA));
  const pB = 1 - pA;

  const rand = Math.random();
  const winner = rand < pA ? rA : rB;
  const kimarite = asKimarite('yorikiri'); // placeholder
  const nonTechnique = undefined; // example

  return { winnerId: winner.id, kimarite, nonTechnique, pWin: rand < pA ? pA : pB };
}
