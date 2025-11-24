#!/usr/bin/env bash
set -euo pipefail

echo "⚙️  Applying HUD reactivity fix…"

# 1) Append nudgeWorld() to time.ts (idempotent: only if not present)
TIME_FILE="src/engine/time.ts"
if [ -f "$TIME_FILE" ] && ! grep -q "export function nudgeWorld" "$TIME_FILE"; then
  cat >> "$TIME_FILE" <<'TS'

// --- PATCH: world change helper (idempotent) ---
// Ensures world updates always notify any subscribers/UIs.
export function nudgeWorld(next: { year: number; month: number; week: number; day: number }) {
  try {
    // Prefer the official setter so all normal side effects fire.
    // @ts-ignore
    if (typeof setWorld === "function") setWorld({ ...next });

    // Broadcast to any code listening via the DOM (safe, no-op in SSR).
    if (typeof window !== "undefined" && "dispatchEvent" in window) {
      window.dispatchEvent(new CustomEvent("world:change", { detail: { ...next } }));
    }
  } catch {
    // Very defensive fallback for unusual bundling orders.
    // @ts-ignore
    const g: any = (typeof window !== "undefined" ? window : globalThis) as any;
    if (typeof g.setWorld === "function") g.setWorld({ ...next });
  }
}
TS
  echo "• Appended nudgeWorld() to $TIME_FILE"
else
  echo "• Skipped time.ts (already has nudgeWorld or file missing)"
fi

# 2) Overwrite skip.ts to use nudgeWorld(...) and keep expected exports
SKIP_FILE="src/engine/skip.ts"
mkdir -p "$(dirname "$SKIP_FILE")"
cat > "$SKIP_FILE" <<'TS'
import { getWorld, nudgeWorld } from "./time";
import { nextBashoStartAfter } from "./basho";

export const stopModes = {
  BASHO_MONTH_DAY1: "BASHO_MONTH_DAY1",
  NONE: "NONE",
} as const;

export type StopMode = typeof stopModes[keyof typeof stopModes];

let _isSkipping = false;
let _isPaused = false;
let _mode: StopMode = stopModes.NONE;
let _target: { year: number; month: number; week: number; day: number } | null = null;

export function isSkipping() { return _isSkipping; }
export function isPaused()   { return _isPaused; }
export function getStopMode(): StopMode { return _mode; }

// Kept for HeaderBar.tsx compatibility
export function setStopMode(mode: StopMode) {
  const values = Object.values(stopModes) as StopMode[];
  _mode = values.includes(mode) ? mode : stopModes.NONE;
}

function key(w: { year: number; month: number; week: number; day: number }) {
  return ((((w.year * 12) + (w.month - 1)) * 4 + (w.week - 1)) * 7 + (w.day - 1));
}
function reachedOrPast(a: any, b: any) { return key(a) >= key(b); }

// Do NOT suppress side-effects; HUD must observe this.
function jumpTo(target: { year: number; month: number; week: number; day: number }) {
  nudgeWorld({ ...target });
}

export function pauseSkip()  { _isPaused = true; }
export function cancelSkip() {
  _isPaused = false;
  _isSkipping = false;
  _mode = stopModes.NONE;
  _target = null;
}

export function nextBasho(): void {
  const cur = getWorld();

  // Always target a basho month strictly AFTER the current month
  const target = nextBashoStartAfter(cur.year, cur.month); // -> {year,month,week:1,day:1}
  if (!target) return;

  const safeTarget = reachedOrPast(cur, target)
    ? {
        year: target.month === 12 ? target.year + 1 : target.year,
        month: target.month === 12 ? 1 : target.month + 1,
        week: 1,
        day: 1,
      }
    : target;

  _isSkipping = true;
  _isPaused   = false;
  _mode       = stopModes.BASHO_MONTH_DAY1;
  _target     = safeTarget;

  // Single atomic jump that also broadcasts a 'world:change' event
  jumpTo(_target);

  _isSkipping = false;
  _isPaused   = false;
  _mode       = stopModes.NONE;
  _target     = null;
}
TS
echo "• Wrote $SKIP_FILE"

echo "✅ Done. Let Vite hot-reload or restart your dev server."
