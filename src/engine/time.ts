import { getWorld as _gw, setWorld as _sw } from "./store";
import { progressBashoIfNeeded } from "./basho";

// Fallbacks if store functions aren't present early in boot.
const getW =
  _gw && typeof _gw === "function"
    ? _gw
    : () =>
        ((window as any).__WORLD__ ||= {
          year: 2025,
          month: 1,
          week: 1,
          day: 1,
        });
const setW =
  _sw && typeof _sw === "function"
    ? _sw
    : (nw: any) => ((window as any).__WORLD__ = nw);

function normalize(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function maybeProgressBasho() {
  // Silence basho side-effects during atomic skips
  if ((window as any).__SKIPPING__) return;
  try {
    progressBashoIfNeeded();
  } catch {}
}

export function advanceDay(): void {
  const w = { ...getW() };
  w.day += 1;
  if (w.day > 7) {
    w.day = 1;
    w.week += 1;
  }
  if (w.week > 4) {
    w.week = 1;
    w.month += 1;
  }
  if (w.month > 12) {
    w.month = 1;
    w.year += 1;
  }
  setW(w);
  maybeProgressBasho();
}

export function advanceWeek(): void {
  const w = { ...getW() };
  w.week += 1;
  if (w.week > 4) {
    w.week = 1;
    w.month += 1;
  }
  if (w.month > 12) {
    w.month = 1;
    w.year += 1;
  }
  w.day = normalize(w.day || 1, 1, 7);
  setW(w);
  maybeProgressBasho();
}

export function getWorld() {
  return getW();
}
export function setWorld(nw: any) {
  return setW(nw);
}

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
