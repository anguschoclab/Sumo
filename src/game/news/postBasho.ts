
export function generatePostBashoNews(state:any){
  state.news ??= [];
  state.news.unshift({ id: 'news_post', kind:'review', headline:'Post-Basho Review', dayISO: state.calendar.todayISO, bullets: ['Overachievers','Underachievers'] });
}
