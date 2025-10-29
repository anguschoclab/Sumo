export type World = {
  year: number;
  month: number; // 1..12
  week: number;  // 1..52 approx
  day: number;   // 1..7 within our sim week
};

const initial: World = { year: 2025, month: 1, week: 1, day: 1 };

let WORLD: World = (globalThis as any).__WORLD__ || initial;

export function getWorld(): World {
  return WORLD;
}

export function setWorld(w: World) {
  WORLD = w;
  (globalThis as any).__WORLD__ = WORLD;
}