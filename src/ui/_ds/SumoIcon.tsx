
import * as React from 'react'
export type SumoIconName = 'torii'|'rope'|'taiko'|'gunbai'|'mawashi'
export function SumoIcon({name, className='w-5 h-5'}:{name:SumoIconName; className?:string}){
  switch(name){
    case 'torii': return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path fill="#8b0000" d="M2 6h20v2H2zM4 4h16v2H4zM6 8h2v12H6zM16 8h2v12h-2z"/>
      </svg>);
    case 'rope': return (
      <svg viewBox="0 0 24 24" className={className}><path fill="#f5e6c8" d="M2 12c6-8 14-8 20 0-6 8-14 8-20 0z"/></svg>);
    case 'taiko': return (
      <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="9" fill="#7c3aed"/><circle cx="12" cy="12" r="6" fill="#fef3c7"/></svg>);
    case 'gunbai': return (
      <svg viewBox="0 0 24 24" className={className}><path fill="#f59e0b" d="M12 2a6 6 0 0 0-6 6c0 5 6 10 6 10s6-5 6-10a6 6 0 0 0-6-6z"/><rect x="11" y="18" width="2" height="4" fill="#92400e"/></svg>);
    case 'mawashi': return (
      <svg viewBox="0 0 24 24" className={className}><rect x="5" y="9" width="14" height="6" rx="2" fill="#334155"/><path d="M7 15l5 5 5-5" stroke="#94a3b8" strokeWidth="2" fill="none"/></svg>);
  }
  return null
}
