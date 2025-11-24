#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Applying Next-Basho + Skip hardening (v3)…"

# --- time.ts: robust week/month/year rollovers ---
mkdir -p src/engine
cat > src/engine/time.ts <<'TS'
import { getWorld as _gw, setWorld as _sw } from "./store";
import { progressBashoIfNeeded } from "./basho";

// Fallbacks if store functions aren't present early in boot.
const getW = _gw && typeof _gw === "function" ? _gw : () => (window as any).__WORLD__ ||= { year:2025, month:1, week:1, day:1 };
const setW = _sw && typeof _sw === "function" ? _sw : (nw:any) => ( (window as any).__WORLD__ = nw );

function normalize(n:number, min:number, max:number){ return Math.min(max, Math.max(min, n)); }

export function advanceDay(): void {
  const w = { ...getW() };
  w.day += 1;
  if (w.day > 7) { w.day = 1; w.week += 1; }
  if (w.week > 4) { w.week = 1; w.month += 1; }
  if (w.month > 12) { w.month = 1; w.year += 1; }
  setW(w);
  // Let basho engine react if needed (e.g., inside basho days)
  try { progressBashoIfNeeded(); } catch {}
}

export function advanceWeek(): void {
  const w = { ...getW() };
  w.week += 1;
  if (w.week > 4) { w.week = 1; w.month += 1; }
  if (w.month > 12) { w.month = 1; w.year += 1; }
  w.day = normalize(w.day || 1, 1, 7);
  setW(w);
  try { progressBashoIfNeeded(); } catch {}
}

export function getWorld(){ return getW(); }
export function setWorld(nw:any){ return setW(nw); }
TS
echo "✅ Patched: src/engine/time.ts"

# --- skip.ts: target calc + monotonic comparator + progress watchdog ---
cat > src/engine/skip.ts <<'TS'
import { getWorld, setWorld, advanceWeek } from "./time";
import { isBashoActive, bashoDayNumber, nextBashoStartAfter } from "./basho";

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
  // ((((Y * 12) + M) * 4 + (W-1)) * 7 + (D-1)) monotonic key
  return ((((w.year*12)+w.month)*4 + (w.week-1))*7 + (w.day-1));
}

function cmp(a:any,b:any){ return key(a) - key(b); }

export function nextBasho(): void {
  const w = getWorld();
  // If already within a basho, make sure we jump to the *next* basho month (strictly after current month)
  const baseYear = w.year;
  const baseMonth = w.month;
  _target = nextBashoStartAfter(baseYear, baseMonth); // returns week:1, day:1
  _mode = stopModes.BASHO_MONTH_DAY1;
  skipRun();
}

export function pauseSkip(){ _isPaused = true; }
export function cancelSkip(){
  _isPaused = false;
  _isSkipping = false;
  _mode = stopModes.NONE;
  _target = null;
}

function stepTowardTarget() {
  // For now we move by weeks. Later we can choose granularity based on distance.
  advanceWeek();
}

function reachedTarget(cur:any, tgt:any){
  return key(cur) >= key(tgt); // stop *on or after* target key
}

function skipRun(){
  if (!_target) return;
  _isSkipping = true;
  _isPaused = false;

  const tgt = _target!;
  let iters = 0;
  let lastKey = key(getWorld());

  while (_isSkipping && !_isPaused) {
    const cur = getWorld();

    // Safety: if somehow already at/after target, stop.
    if (reachedTarget(cur, tgt)) break;

    stepTowardTarget();

    const now = getWorld();
    const nowKey = key(now);
    iters++;

    // Progress watchdog: if key didn't increase, bail out to avoid loops.
    if (nowKey <= lastKey) {
      console.warn("[skip] No progress detected, aborting skip.", { now, lastKey, nowKey, iters });
      break;
    }
    lastKey = nowKey;

    // Iteration cap as a final guard.
    if (iters > 2000) {
      console.warn("[skip] Iteration cap reached, aborting skip.", { now, tgt, iters });
      break;
    }

    if (reachedTarget(now, tgt)) break;
  }

  _isSkipping = false;
  _isPaused = false;
}
TS
echo "✅ Patched: src/engine/skip.ts"

echo "🎯 Done. Restart your dev server if it’s already running."
