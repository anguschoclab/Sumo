import { getWorld, setWorld } from "./store";
import { isBashoMonth, nextBashoMonth } from "./basho";

export const stopModes: Record<string, {label:string}> = {
  BASHO_MONTH_DAY1: { label: "Month Day 1" }
};

export function getStopMode(): string {
  return (globalThis as any).__STOP_MODE__ || "BASHO_MONTH_DAY1";
}
export function setStopMode(mode: string) {
  (globalThis as any).__STOP_MODE__ = mode;
}

export const skipping: { active: boolean; target: Date | null } = {
  active: false,
  target: null
};

export function isSkipping() { return skipping.active; }

export function cancelSkip() {
  skipping.active = false;
}
export function pauseSkip() {
  skipping.active = false;
}

export function stopAtMonthDay1Target(): Date {
  const w = getWorld();
  const nm = nextBashoMonth(w.month);
  const year = w.month < nm ? w.year : w.year + 1;
  // Stop on the 1st of the next basho month
  const d = new Date(year, nm-1, 1);
  return d;
}

export function nextBasho() {
  skipping.active = true;
  skipping.target = stopAtMonthDay1Target();
  // fast-forward in week steps until we reach the target month/day
  let guard = 0;
  while (skipping.active && guard++ < 1000) {
    const w = { ...getWorld() };
    // advance by a day to keep banners responsive
    w.day += 1;
    if (w.day > 7) { w.day = 1; w.week += 1; w.month += 1; if (w.month > 12) { w.month = 1; w.year += 1; } }
    setWorld(w);
    if (reachedTargetDate(w)) {
      skipping.active = false;
    }
  }
}

function reachedTargetDate(w: {year:number,month:number,day:number}) {
  if (!skipping.target) return false;
  const now = new Date(w.year, w.month-1, w.day);
  return now >= skipping.target;
}

export function stopIfReached() {
  const w = getWorld();
  if (reachedTargetDate(w)) {
    skipping.active = false;
  }
}