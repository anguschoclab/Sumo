
import { getWorld, setWorld, emitWorldChange } from './time'
import { nextBashoStartAfter } from './basho'

export const stopModes = {
  BASHO_MONTH_DAY1: 'BASHO_MONTH_DAY1',
  NONE: 'NONE'
} as const
export type StopMode = typeof stopModes[keyof typeof stopModes]

let _stopMode: StopMode = stopModes.BASHO_MONTH_DAY1
export function getStopMode(): StopMode { return _stopMode }
export function toggleStopMode(): StopMode {
  _stopMode = _stopMode === stopModes.NONE ? stopModes.BASHO_MONTH_DAY1 : stopModes.NONE
  emitWorldChange()
  return _stopMode
}

export function addDay() {
  const w = getWorld()
  let day = w.day + 1
  let month = w.month
  let year = w.year
  if (day > 30) { day = 1; month += 1 }
  if (month > 12) { month = 1; year += 1 }
  setWorld({ ...w, year, month, day })
}

export function addWeek() {
  for (let i=0;i<7;i++) addDay()
}

export function nextBasho() {
  const next = nextBashoStartAfter(getWorld())
  setWorld(next)
}

export function cancelSkip() {
  emitWorldChange()
}
