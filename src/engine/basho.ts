import { getWorld } from "./store";

export type Bout = { east: string; west: string };
export const state: { day: number; torikumi: Record<number, Bout[]> } = {
  day: 1,
  torikumi: {}
};

export function isBashoMonth(m: number) {
  return [1,3,5,7,9,11].includes(m);
}

export function startBashoIfNeeded() {
  const w = getWorld();
  if (!isBashoMonth(w.month)) return;
  if (!state.torikumi[1]) {
    state.day = 1;
    state.torikumi = {};
    state.torikumi[1] = makeTorikumiForDay();
  }
}

function sample(names: string[], count: number) {
  const out: string[] = [];
  const pool = [...names];
  while (out.length < count && pool.length) {
    const i = Math.floor(Math.random()*pool.length);
    out.push(pool.splice(i,1)[0]);
  }
  return out;
}

const RIKISHI = [
  "Hoshoryu","Daieisho","Abi","Kotonowaka","Takakeisho",
  "Asanoyama","Kiribayama","Wakamotoharu","Mitakeumi","Ura",
  "Tobizaru","Kotoeko","Takayasu","Tamawashi","Endo","Shodai",
  "Onosho","Sadanoumi","Meisei","Hokutofuji"
];

function makeTorikumiForDay(): Bout[] {
  const picks = sample(RIKISHI, 20);
  const bouts: Bout[] = [];
  for (let i=0; i<picks.length; i+=2) {
    const east = picks[i], west = picks[i+1];
    if (!west) break;
    bouts.push({ east, west });
  }
  return bouts;
}

export function getTorikumi(day?: number): Bout[] {
  // Fix for ?? with || precedence: explicitly parenthesize
  const d = (day ?? state.day) || 1;
  if (!state.torikumi[d]) state.torikumi[d] = makeTorikumiForDay();
  return state.torikumi[d];
}

export function nextBashoMonth(currentMonth: number): number {
  const seq = [1,3,5,7,9,11];
  for (const m of seq) { if (m > currentMonth) return m; }
  return 1;
}