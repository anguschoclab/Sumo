import { defaultBashoSchedule } from './schedule'
import { wrestlers } from './wrestlers'
import { initialStandings } from './standings'

export function seedAll(){
  return {
    schedule: defaultBashoSchedule,
    wrestlers,
    standings: initialStandings
  }
}