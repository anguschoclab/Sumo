
import { addDays, addWeek, nextBashoStartAfter } from './time.js';
import { persist } from './world.js';
export function stepDay(world){ addDays(world,1); persist(world); return world; }
export function stepWeek(world){ addWeek(world); persist(world); return world; }
export function jumpToNextBasho(world){ const n=nextBashoStartAfter(world); world.year=n.year; world.month=n.month; world.day=n.day; persist(world); return world; }
