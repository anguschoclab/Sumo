
export const KEY = 'sumo.save.v1';
export function load(){ try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch(e){ return null; } }
export function save(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }
export function clear(){ localStorage.removeItem(KEY); }
