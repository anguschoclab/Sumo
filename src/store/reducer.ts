
import { sclone } from '@/util/clone'
import { uid } from '@/util/id'
import { grantHonor } from '@/game/awards'
const initial:any = {
  calendar: { todayISO: '2026-01-01', phase: 'between_basho', nextBashoStartISO: '2026-02-12' },
  news: [], events: [], rikishi: [], heya: [], ui: {}, flags: {}, rikishiHonors: {}, rivalries: { rikishi: [] }
}
function pushEvent(state:any, e:any){
  state.events ??= [];
  state.events.push({ id: uid('ev'), ...e });
  if (state.events.length > 3000) state.events.splice(0, state.events.length - 3000);
}
export function reducer(state=initial, action:any){
  switch(action.type){
    case 'NEW_GAME': {
      const next = sclone(state);
      const seed = action.seed || Date.now();
      next.calendar = { todayISO: '2026-01-01', phase: 'between_basho', nextBashoStartISO: '2026-02-12' };
      next.news = []; next.events = []; next.rikishi = []; next.heya = []; next.rikishiHonors = {};
      next.flags = { started: true, seed };
      next.rikishi.push({ id:'r1', shikona:'Hakuzen', division:'makuuchi', rankTitle:'Maegashira 3', heyaShort:'Haku', skill:0.7 });
      next.rikishi.push({ id:'r2', shikona:'Aoishi', division:'makuuchi', rankTitle:'Maegashira 5', heyaShort:'Ao', skill:0.6 });
      next.news.unshift({ id: uid('news'), kind:'system', headline:'New World Created', dayISO: next.calendar.todayISO, bullets:['Welcome to Basho!'] });
      return next;
    }
    case 'AWARD_GRANT': {
      const next = sclone(state);
      grantHonor(next, action.rikishiId, action.honorKey, action.amount ?? 1);
      return next;
    }
    case 'EVENT_LOG': { const next = sclone(state); pushEvent(next, action.payload); return next; }
    default: return state;
  }
}
