import { World, toDate } from './time'

// Return the Date of the next basho after (or equal to) the given world date.
// Simple month schedule: Jan, Mar, May, Jul, Sep, Nov -> start on 10th
const BASHO_MONTHS = [1,3,5,7,9,11]

export function nextBashoStartAfter(w: World): Date {
  const d = toDate(w)
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const after = BASHO_MONTHS.find(mm => mm > m) ?? BASHO_MONTHS[0]
  const year = after > m ? y : y + 1
  return new Date(year, after - 1, 10)
}
