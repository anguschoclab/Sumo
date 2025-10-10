import { create } from 'zustand'
import type { Universe } from '@/types'
import { generateUniverse, simDay as engineSimDay } from '@/world'
import { quicksave, quickload, saveNamed, loadNamed, deleteNamed, listSaves } from '@/world'

type Store = {
  started:boolean
  universe: Universe | null
  saveModalOpen:boolean
  startNew:(name:string,heya:string)=>void
  simDay:()=>void
  openSaveModal:()=>void
  closeSaveModal:()=>void
  quicksave:()=>void
  quickload:()=>void
  saveNamed:(n:string)=>void
  loadNamed:(n:string)=>void
  deleteNamed:(n:string)=>void
  listSaves:()=>string[]
}

export const useGame = create<Store>((set,get)=>({
  started:false,
  universe:null,
  saveModalOpen:false,
  startNew:(name,heya)=>{
    const u = generateUniverse(Date.now(), name, heya)
    set({ started:true, universe:u })
  },
  simDay:()=>{
    const u = get().universe
    if(!u) return
    const next = engineSimDay(u)
    set({ universe: next })
  },
  openSaveModal:()=> set({ saveModalOpen:true }),
  closeSaveModal:()=> set({ saveModalOpen:false }),
  quicksave:()=>{ const u = get().universe; if(u) quicksave(u) },
  quickload:()=>{ const u = quickload(); if(u) set({ started:true, universe:u }) },
  saveNamed:(n)=>{ const u = get().universe; if(u) saveNamed(n,u) },
  loadNamed:(n)=>{ const u = loadNamed(n); if(u) set({ started:true, universe:u }) },
  deleteNamed:(n)=> deleteNamed(n),
  listSaves:()=> listSaves(),
}))
