
export function randomChoice(arr){ return arr[Math.floor(Math.random()*arr.length)] }
export function makeShikona(db){ const p = randomChoice(db.kanjiPrefixes); const s = randomChoice(db.kanjiSuffixes); return p + s; }
export function makeCivilName(db){ return randomChoice(db.family) + ' ' + randomChoice(db.given); }
