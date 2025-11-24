#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Applying Next-Basho atomic jump (v4)…"

# --- time.ts: only call progressBashoIfNeeded when NOT skipping ---
cat > src/engine/time.ts <<'TS'
import { getWorld as _gw, setWorld as _sw } from "./store";
import { progressBashoIfNeeded } from "./basho";

// Fallbacks if store functions aren't present early in boot.
const getW = _gw && typeof _gw === "function" ? _gw : () => (window as any).__WORLD__ ||= { year:2025, month:1, week:1, day:1 };
const setW = _sw && typeof _sw === "function" ? _sw : (nw:any) => ( (window as any).__WORLD__ = nw );

function normalize(n:number, min:number, max:number){ return Math.min(max, Math.max(min, n)); }

function maybeProgressBasho(){
  // Silence basho side-effects during atomic skips
  if ((window as any).__SKIPPING__) return;
  try { progressBashoIfNeeded(); } catch {}
}

export function advanceDay(): void {
  const w = { ...getW() };
  w.day += 1;
  if (w.day > 7) { w.day = 1; w.week += 1; }
  if (w.week > 4) { w.week = 1; w.month += 1; }
  if (w.month > 12) { w.month = 1; w.year += 1; }
  setW(w);
  maybeProgressBasho();
}

export function advanceWeek(): void {
  const w = { ...getW() };
  w.week += 1;
  if (w.week > 4) { w.week = 1; w.month += 1; }
  if (w.month > 12) { w.month = 1; w.year += 1; }
  w.day = normalize(w.day || 1, 1, 7);
  setW(w);
  maybeProgressBasho();
}

export function getWorld(){ return getW(); }
export function setWorld(nw:any){ return setW(nw); }
TS
echo "✅ Patched: src/engine/time.ts"

# --- skip.ts: compute target and JUMP (no loop), with safety guards ---
cat > src/engine/skip.ts <<'TS'
import { getWorld, setWorld } from "./time";
import { nextBashoStartAfter, isBashoActive } from "./basho";

export const stopModes = {
  BASHO_MONTH_DAY1: "BASHO_MONTH_DAY1",
  NONE: "NONE",
} as const;

let _isSkipping = false;
let _isPaused = false;
let _mode: string = stopModes.NONE;
let _target: { year:number; month:number; week:number; day:number } | null = null;

export function isSkipping(){ return _isSkipping; }
export function isPaused(){ return _isPaused; }
export function getStopMode(){ return _mode; }

function key(w:{year:number;month:number;week:number;day:number}) {
  // Normalize to monotonic key
  return ((((w.year*12)+(w.month-1))*4 + (w.week-1))*7 + (w.day-1));
}
function reachedOrPast(a:any,b:any){ return key(a) >= key(b); }

function withSkippingFlag<T>(fn:()=>T): T {
  const g:any = (window as any);
  const prev = !!g.__SKIPPING__;
  g.__SKIPPING__ = true;
  try { return fn(); }
  finally { g.__SKIPPING__ = prev; }
}

function jumpTo(target:{year:number;month:number;week:number;day:number}) {
  // Atomic update: no loops. Let basho progress run only AFTER the jump (time.ts suppresses during __SKIPPING__).
  withSkippingFlag(() => {
    setWorld({ ...target });
  });
}

export function pauseSkip(){ _isPaused = true; }
export function cancelSkip(){
  _isPaused = false;
  _isSkipping = false;
  _mode = stopModes.NONE;
  _target = null;
}

export function nextBasho(): void {
  const cur = getWorld();

  // If currently in a basho, ensure we target the *next* basho month strictly after the current month.
  const baseYear  = cur.year;
  const baseMonth = cur.month;

  const target = nextBashoStartAfter(baseYear, baseMonth); // must return week:1, day:1
  if (!target) return;

  // Safety: if the computed target is not in the future (bad config), nudge to the following month.
  const safeTarget = reachedOrPast(cur, target)
    ? { year: target.month === 12 ? target.year + 1 : target.year,
        month: target.month === 12 ? 1 : target.month + 1,
        week: 1, day: 1 }
    : target;

  _isSkipping = true;
  _isPaused   = false;
  _mode       = stopModes.BASHO_MONTH_DAY1;
  _target     = safeTarget;

  // Atomic jump, then clear state.
  jumpTo(_target);
  _isSkipping = false;
  _isPaused   = false;
  _mode       = stopModes.NONE;
  _target     = null;
}
TS
echo "✅ Patched: src/engine/skip.ts"

echo "🎯 Done. Restart your dev server."
