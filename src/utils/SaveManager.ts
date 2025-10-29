
const KEY = 'basho_saves_v2'
type SaveSlot = { id:string; name:string; iso:string; world:any; version: number }
const VERSION = 2

function safeParse<T>(raw: string, fallback: T): T { try { return JSON.parse(raw) } catch { return fallback } }
function read(): SaveSlot[]{ return safeParse(localStorage.getItem(KEY) || '[]', []) }
function write(saves:SaveSlot[]){ localStorage.setItem(KEY, JSON.stringify(saves)) }

export function quicksave(world:any){
  const saves=read()
  const slot:SaveSlot = { id:'quick', name:'Quick Save', iso:new Date().toISOString(), world, version: VERSION }
  const idx=saves.findIndex(s=> s.id==='quick'); if (idx>=0) saves[idx]=slot; else saves.unshift(slot)
  write(saves)
}

export function quickload(): any | null {
  const s = read().find(x=> x.id==='quick')
  return s?.world || null
}

export function listSaves(){ return read().filter(s=> s.id!=='quick') }
export function saveAs(name:string, world:any){
  const saves=read(); const id='manual-'+Date.now()
  saves.unshift({ id, name, iso:new Date().toISOString(), world, version: VERSION }); write(saves)
}
export function load(id:string){ return (read().find(x=> x.id===id))?.world || null }
export function remove(id:string){ write(read().filter(x=>x.id!==id)) }
