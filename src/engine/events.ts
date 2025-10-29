export type WorldEvent = { week: number, kind: string, text: string, aId?: string, bId?: string }
let _events: WorldEvent[] = []
export function pushEvent(evt: WorldEvent){ _events.unshift(evt); if(_events.length>200) _events.length = 200 }
export function listEvents(){ return _events.slice(0,100) }
