
import { rivalryRank } from '@/game/rivalry';
export function generatePreBashoNews(state:any){
  const edges = (state.rivalries?.rikishi || []).slice().sort((a:any,b:any)=> rivalryRank(b)-rivalryRank(a));
  const top = edges.slice(0,3).map((e:any)=> `${e.aId} vs ${e.bId}`);
  state.news ??= [];
  state.news.unshift({ id: 'news_pre', kind:'preview', headline:'Pre-Basho Preview', dayISO: state.calendar.todayISO, bullets: top });
}
