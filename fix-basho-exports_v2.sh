#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Patching src/engine/basho.ts to restore missing exports…"

mkdir -p src/engine
cat > src/engine/basho.ts <<'TS'
// Minimal basho engine shim with the exports skip.ts & BashoPanel expect.
// Replace with full implementation in later sprints.

export type Bout = { east: string; west: string };

export const state: {
  active: boolean;
  month: number;   // basho month (1,3,5,7,9,11) while active
  day: number;     // basho day 1..15 while active
  torikumi: Record<number, Bout[]>;
} = {
  active: false,
  month: 1,
  day: 1,
  torikumi: {}
};

export function isBashoMonth(m: number): boolean {
  return [1, 3, 5, 7, 9, 11].includes(m);
}

export function isBashoActive(): boolean {
  return !!state.active;
}

export function startBashoIfNeeded(): boolean {
  const w: any = (window as any).__WORLD__ ||= { year: 2025, month: 1, week: 1, day: 1 };
  if (!isBashoMonth(w.month)) { state.active = false; return false; }
  if (!state.active) {
    state.active = true;
    state.month = w.month;
    state.day = 1;
    state.torikumi = {};
  }
  return true;
}

// Advance internal basho day (stub; real progression later)
export function progressBashoIfNeeded(): void {
  if (!state.active) return;
  state.day = Math.min(15, state.day + 1);
  if (state.day >= 15) {
    state.active = false; // ends after day 15 in this stub
  }
}

// === Missing exports used by skip.ts ===

// Current basho day number (or 0 if no basho)
export function bashoDayNumber(): number {
  return state.active ? state.day : 0;
}

// Compute next basho start (Day 1) strictly AFTER the given point.
// Accepts either (year, month) numbers or a world-like object.
// Returns a world-like {year, month, week:1, day:1}.
export function nextBashoStartAfter(a: any, b?: any): { year: number; month: number; week: number; day: number } {
  let year: number, month: number;
  if (typeof a === "number") {
    year = a; month = Number(b) || 1;
  } else if (a && typeof a === "object") {
    year = Number(a.year) || 2025;
    month = Number(a.month) || 1;
  } else {
    const w: any = (window as any).__WORLD__ ||= { year: 2025, month: 1, week: 1, day: 1 };
    year = w.year; month = w.month;
  }

  const bashoMonths = [1, 3, 5, 7, 9, 11];
  // find the next basho month strictly after (year, month)
  let targetYear = year;
  let targetMonth: number | null = null;
  for (const m of bashoMonths) {
    if (m > month) { targetMonth = m; break; }
  }
  if (targetMonth == null) { targetMonth = 1; targetYear = year + 1; }

  return { year: targetYear, month: targetMonth, week: 1, day: 1 };
}

// === Torikumi stubs ===

function makeTorikumiForDay(day: number): Bout[] {
  const names = [
    "Hoshoryu","Daieisho","Abi","Kotonowaka","Takakeisho","Asanoyama",
    "Kiribayama","Wakamotoharu","Mitakeumi","Ura","Kotoeko","Tobizaru",
    "Takayasu","Tamawashi","Endo","Shodai","Onosho","Sadanoumi","Meisei","Hokutofuji"
  ];
  const bouts: Bout[] = [];
  for (let i = 0; i < 10; i++) {
    const east = names[(day + i) % names.length];
    const west = names[(day + i + 7) % names.length];
    bouts.push({ east, west });
  }
  return bouts;
}

export function getTorikumi(day?: number): Bout[] {
  const d = (day ?? state.day) || 1;
  if (!state.torikumi[d]) state.torikumi[d] = makeTorikumiForDay(d);
  return state.torikumi[d];
}
TS

echo "✅ Patched src/engine/basho.ts"
