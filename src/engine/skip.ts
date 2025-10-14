import { getWorld, setWorld, emitWorldChange } from './time'
import { nextBashoStartAfter } from './basho'

export type StopMode = 'DAY' | 'WEEK' | 'BASHO'
let stopMode: StopMode = 'DAY'

export function getStopMode(): StopMode { return stopMode }
export function toggleStopMode() {
  stopMode = stopMode === 'DAY' ? 'WEEK' : stopMode === 'WEEK' ? 'BASHO' : 'DAY'
  emitWorldChange()
}

export function addDay() {
  const w = getWorld()
  const d = new Date(w.year, w.month - 1, w.day)
  d.setDate(d.getDate() + 1)
  setWorld({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() })
}

export function addWeek() {
  const w = getWorld()
  const d = new Date(w.year, w.month - 1, w.day)
  d.setDate(d.getDate() + 7)
  setWorld({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() })
}

export function nextBasho() {
  const w = getWorld()
  const nb = nextBashoStartAfter(w)
  setWorld({ year: nb.getFullYear(), month: nb.getMonth() + 1, day: nb.getDate() })
}

export function cancelSkip() {
  // placeholder hook for future auto-sim cancel
  emitWorldChange()
}
