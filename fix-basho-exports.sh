#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Restoring expected exports in src/engine/basho.ts"

mkdir -p src/engine
cat > src/engine/basho.ts <<'TS'
// Minimal basho engine shim with the exports BashoPanel/time.ts expect.
// We’ll replace with the full implementation in later sprints.

export type Bout = { east: string; west: string };

export const state: {
  active: boolean;
  month: number;
  day: number;
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

export function progressBashoIfNeeded(): void {
  // Stub for now — real daily progression handled in later sprint.
  // Kept so time.ts imports won't fail.
}

function makeTorikumiForDay(day: number): Bout[] {
  // Placeholder torikumi; enough for layout/tests. Replace with real pairings later.
  const names = ["Hoshoryu","Daieisho","Abi","Kotonowaka","Takakeisho","Asanoyama","Kiribayama","Wakamotoharu","Mitakeumi","Ura","Kotoeko","Tobizaru","Takayasu","Tamawashi","Endo","Shodai","Onosho","Sadanoumi","Meisei","Hokutofuji"];
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

echo "✅ Wrote src/engine/basho.ts with { state, isBashoMonth, isBashoActive, startBashoIfNeeded, progressBashoIfNeeded, getTorikumi }"
