
import { save, load } from './storage.js';
export function makeEmptyWorld(){ return { year:2025, month:1, day:1, player:{ name:'Manager', heya:'Shioyama-beya' }, heyas:[], rikishi:[], finances:{ cash:1000000, sponsors:[], ledger:[] }, rivalries:[], events:[], standings:{} }; }
export function bootstrap(seedFn){ const existing = load(); if (existing) return existing; const seeded = seedFn(makeEmptyWorld()); save(seeded); return seeded; }
export function persist(world){ save(world); }
export function clone(x){ return JSON.parse(JSON.stringify(x)); }
