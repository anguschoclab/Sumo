// SumoGame delta: ensure named exports `advanceDay` and `advanceWeek` exist.
// This file is a compatibility layer. If your real engine/time already exists,
// you can keep this as the canonical entry and delegate to globals/hooks if present.

type World = any;

function getWorld(): World | undefined {
  // Use engine singleton if present; else fall back to window.__WORLD__
  const w = (globalThis as any).__getWorld;
  if (typeof w === 'function') return w();
  return (globalThis as any).__WORLD__;
}

function setWorld(nw: World) {
  const s = (globalThis as any).__setWorld;
  if (typeof s === 'function') return s(nw);
  (globalThis as any).__WORLD__ = nw;
}

// Attempt to call an existing engine function by name; otherwise do nothing.
function callIfExists(name: string, ...args: any[]) {
  const g: any = globalThis as any;
  const fn = g[name];
  if (typeof fn === 'function') return fn(...args);
  return undefined;
}

export function advanceDay(): void {
  // Prefer real engine implementations if present
  if (callIfExists('__ADVANCE_DAY') !== undefined) return;
  if (callIfExists('advanceDay') !== undefined) return;

  // Fallback: naive tick on world time
  const w = getWorld();
  if (!w) return;
  w.time = w.time || { week: 1, day: 1 };
  w.time.day = (w.time.day || 0) + 1;
  if (w.time.day > 7) {
    w.time.day = 1;
    w.time.week = (w.time.week || 0) + 1;
  }
  setWorld(w);
}

export function advanceWeek(): void {
  if (callIfExists('__ADVANCE_WEEK') !== undefined) return;
  if (callIfExists('advanceWeek') !== undefined) return;

  const w = getWorld();
  if (!w) return;
  w.time = w.time || { week: 1, day: 1 };
  w.time.week = (w.time.week || 0) + 1;
  w.time.day = 1;
  setWorld(w);
}

// Optional helpers used by other modules can safely no-op here.
// Re-export stubs so imports don't break if they exist.
export function isBashoActive(): boolean {
  // If a global decides, trust it
  const x = callIfExists('isBashoActive');
  if (typeof x === 'boolean') return x;
  const w = getWorld();
  return !!(w && w.basho && w.basho.active);
}

export function progressBashoIfNeeded(): void {
  if (callIfExists('progressBashoIfNeeded') !== undefined) return;
  // no-op fallback
}

// You may add other passthrough exports here as needed.
