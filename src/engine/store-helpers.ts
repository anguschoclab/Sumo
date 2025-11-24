// src/engine/store-helpers.ts
// Supplies ensureWorld() without forcing edits to the existing store.ts.
// Tries to use useStore from './store' and initializes a minimal world if missing.

// We intentionally use `any` here to avoid strict type coupling.
let _useStore: any = null;
try {
  // This import will succeed if your project exports useStore from src/engine/store.ts
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("./store");
  _useStore = mod?.useStore ?? null;
} catch (e) {
  // ignore — fallback below
}

export function ensureWorld(seed?: Partial<any>) {
  const useStore = _useStore;
  if (!useStore || !useStore.getState || !useStore.setState) {
    // Very defensive fallback: keep a tiny in-file world so skip.ts can still function.
    if (!(globalThis as any).__fallback_world) {
      (globalThis as any).__fallback_world = {
        week: 1,
        day: 1,
        date: new Date("2025-01-01"),
        basho: null,
        feed: [],
      };
    }
    return (globalThis as any).__fallback_world;
  }

  const state = useStore.getState() || {};
  if (!state.world) {
    const initial = {
      week: 1,
      day: 1,
      date: new Date("2025-01-01"),
      basho: null,
      feed: [],
      ...seed,
    };
    useStore.setState({ world: initial });
    return initial;
  }
  return state.world;
}
