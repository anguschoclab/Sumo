
export type World = {
  year: number
  month: number // 1..12
  day: number   // 1..30 (simplified calendar)
  bashoMonth?: number // if a basho is scheduled this month
}

const listeners = new Set<() => void>()
let world: World = { year: 2025, month: 1, day: 1 }

export function getWorld(): World {
  return world
}

export function setWorld(next: World) {
  world = next
  emitWorldChange()
}

export function onWorldChange(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function emitWorldChange() {
  for (const fn of Array.from(listeners)) {
    try { fn() } catch {}
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('world:change'))
  }
}

export function toDateString(w: World): string {
  const mm = String(w.month).padStart(2, '0')
  const dd = String(w.day).padStart(2, '0')
  return `${w.year}-${mm}-${dd}`
}
