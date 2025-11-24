
import { getWorld, setWorld, World } from './time'

const BASHO_MONTHS = [1, 3, 5, 7, 9, 11] as const

export type Basho = {
  name: string
  month: number
  location: string
}

export function currentBashoMonth(w: World = getWorld()): number | null {
  return BASHO_MONTHS.includes(w.month as any) ? w.month : null
}

export function nextBashoStartAfter(w: World): World {
  const months = [...BASHO_MONTHS]
  const after = months.find(m => m > w.month) ?? months[0]
  const year = after > w.month ? w.year : w.year + 1
  return { ...w, year, month: after, day: 1 }
}

export function getAnnualBashoSchedule(year: number): Basho[] {
  const names = ['Hatsu', 'Haru', 'Natsu', 'Nagoya', 'Aki', 'Kyushu']
  const loc = ['Tokyo', 'Osaka', 'Tokyo', 'Nagoya', 'Tokyo', 'Fukuoka']
  return BASHO_MONTHS.map((m, i) => ({ name: names[i], month: m, location: loc[i] }))
}
