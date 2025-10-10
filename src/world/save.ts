import type { Universe } from '@/types'
const QS = 'sumogame.quicksave'
const NS = 'sumogame.named.'
export function quicksave(u:Universe){ localStorage.setItem(QS, JSON.stringify(u)) }
export function quickload():Universe|null{ const s = localStorage.getItem(QS); return s? JSON.parse(s) as Universe : null }
export function saveNamed(name:string,u:Universe){ localStorage.setItem(NS+name, JSON.stringify(u)) }
export function loadNamed(name:string):Universe|null{ const s = localStorage.getItem(NS+name); return s? JSON.parse(s) as Universe : null }
export function deleteNamed(name:string){ localStorage.removeItem(NS+name) }
export function listSaves():string[]{ return Object.keys(localStorage).filter(k=>k.startsWith(NS)).map(k=>k.substring(NS.length)) }
