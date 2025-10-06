
import { sclone } from '@/util/clone'
import { uid } from '@/util/id'

const initial:any = {
  calendar: { todayISO: '2026-01-01', phase: 'between_basho', nextBashoStartISO: '2026-02-12' },
  news: [], events: [], rikishi: [], heya: [], ui: {}
}

function pushEvent(state:any, e:any){
  state.events ??= [];
  state.events.push({ id: uid('ev'), ...e });
  if (state.events.length > 3000) state.events.splice(0, state.events.length - 3000);
}

export function reducer(state=initial, action:any){
  switch(action.type){
    case 'EVENT_LOG': { const next = sclone(state); pushEvent(next, action.payload); return next; }
    case 'UI_DISMISS_PRE_BASHO_BANNER': {
      const next = sclone(state); next.ui ??= {}; next.ui.preBashoBanner ??= { active:false }; next.ui.preBashoBanner.active=false; return next;
    }
    default: return state;
  }
}
