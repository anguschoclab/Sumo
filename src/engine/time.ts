export type World = {
  year: number
  month: number
  day: number
}

const KEY = 'sumo.world.v1'

function clampDate(w: World): World {
  const d = new Date(w.year, w.month - 1, w.day)
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
}

let world: World = loadWorld() || { year: 2025, month: 1, day: 1 }

export function getWorld(): World {
  return { ...world }
}

export function setWorld(next: World) {
  world = clampDate(next)
  saveWorld()
  emitWorldChange()
}

export function toDate(w: World): Date {
  return new Date(w.year, w.month - 1, w.day)
}

export function addDays(n: number) {
  const d = toDate(world)
  d.setDate(d.getDate() + n)
  setWorld({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() })
}

export function saveWorld() {
  try { localStorage.setItem(KEY, JSON.stringify(world)) } catch {}
}

export function loadWorld(): World | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const w = JSON.parse(raw)
    if (typeof w?.year === 'number') return clampDate(w)
  } catch {}
  return null
}

// --- world:change event bus
type Handler = () => void
const listeners = new Set<Handler>()

export function onWorldChange(fn: Handler): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function emitWorldChange() {
  for (const fn of Array.from(listeners)) {
    try { fn() } catch {}
  }
}
