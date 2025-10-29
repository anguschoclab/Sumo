// Improved shikona generator — uniqueness + casing + gentle phonotactics
// Backwards compatible: still exports `generateShikona()` but now ensures
// proper capitalization and (when possible) world-unique names.

import { ensureWorld } from './store'

const left = [
  'asa','haku','koto','kane','tochi','teru','mito','endo','sho','ichi','kaga','hoko','fuku','kaze','hoko','aom','okin','fuk','kaz','tok','bran','mon','geon','rus','bul','kan','osa','nag','ukr','usa'
]
const cores = [
  'no','ya','ka','o','na','sa','shi','mi','ra','to','ki','zu'
]
const right = [
  'yama','kawa','sato','umi','fuji','kaze'
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random()*arr.length)]
}

function formatShikona(raw: string){
  // Normalize connector "no" to lowercase, rest capitalized word
  // Collapse accidental duplicates like 'nno' -> 'no'
  let s = raw
  s = s.replace(/nno/g,'no').replace(/--+/g,'-')
  // Lowercase everything then capitalize first, but keep 'no' lowercase when in middle
  s = s.toLowerCase()
  s = s.replace(/([a-z]+)no([a-z]+)/, (_,a,b)=> a + 'no' + b) // keep 'no'
  // Capitalize first letter
  s = s.charAt(0).toUpperCase() + s.slice(1)
  return s
}

function makeCandidate(){
  // 60% include the connector 'no'
  const useNo = Math.random() < 0.6
  const L = pick(left)
  const C = useNo ? 'no' : pick(cores)
  const R = pick(right)
  return formatShikona(L + C + R)
}

function collectExisting(world: any){
  const set = new Set<string>()
  if(world?.heyas){
    for(const h of world.heyas){
      if(!h?.rikishi) continue
      for(const r of h.rikishi){
        if(typeof r?.shikona === 'string'){
          set.add(String(r.shikona).toLowerCase())
        }
      }
    }
  }
  return set
}

function makeSuffix(attempt: number){
  const roman = [' II',' III',' IV']
  const kanaish = ['-o','maru','zan','ryu']
  if(attempt < 3) return '-o'
  if(attempt < 6) return pick(kanaish)
  return pick(roman)
}

/** Primary API — stays the same signature. */
export function generateShikona(): string {
  // If a world exists, ensure uniqueness globally
  let world: any = null
  try { world = ensureWorld() } catch {}
  const existing = collectExisting(world)
  let attempt = 0
  while(attempt < 20){
    let cand = makeCandidate()
    if(attempt > 0 && existing.has(cand.toLowerCase())){
      cand = formatShikona(cand + makeSuffix(attempt))
    }
    if(!existing.has(cand.toLowerCase())) return cand
    attempt++
  }
  // Fallback: ultra-unique
  const fallback = formatShikona(makeCandidate() + '-' + Math.floor(Math.random()*1000))
  return fallback
}

/** Repair pass — deduplicate any existing collisions in the world. Returns the number changed. */
export function dedupeShikona(world?: any): number {
  const w = world || ensureWorld()
  const seen = new Set<string>()
  let changes = 0
  for(const h of w.heyas){
    for(const r of h.rikishi){
      if(!r.shikona || typeof r.shikona !== 'string'){
        r.shikona = generateShikona()
      }
      let s = formatShikona(String(r.shikona))
      let attempt = 0
      while(seen.has(s.toLowerCase()) && attempt < 20){
        s = formatShikona(s + makeSuffix(attempt))
        attempt++
      }
      if(s !== r.shikona){ r.shikona = s; changes++; }
      seen.add(s.toLowerCase())
    }
  }
  return changes
}
