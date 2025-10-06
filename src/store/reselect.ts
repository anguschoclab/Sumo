
import { createSelector } from 'reselect'
const strip = (s:string='')=> s.normalize('NFKD').replace(/\p{Diacritic}/gu,'').toLowerCase()

export const selectPeopleFiltered = createSelector(
  [(s:any)=> s.rikishi, (s:any)=> s.ui?.peopleQuery?.q || '', (s:any)=> s.ui?.peopleQuery?.division || null, (s:any)=> s.ui?.peopleQuery?.heyaId || null],
  (all:any[], q, div, heyaId)=>{
    let list = (all||[]).filter(r=> r.status!=='retired')
    const sq = strip(q)
    if (sq) list = list.filter(r=> strip(r.shikona||'').includes(sq) || strip(r.shikonaKanji||'').includes(sq))
    if (div) list = list.filter(r=> r.division===div)
    if (heyaId) list = list.filter(r=> r.heyaId===heyaId)
    return list
  }
)
