export type Wrestler = { id: string; name: string; power: number; stamina: number }
export type Match = { id: string; a: Wrestler; b: Wrestler; winner?: string; rounds?: number }

const DEMO_WRESTLERS: Wrestler[] = [
  { id: 'w1', name: 'Hakuho', power: 95, stamina: 85 },
  { id: 'w2', name: 'Asashoryu', power: 90, stamina: 88 },
  { id: 'w3', name: 'Kisenosato', power: 82, stamina: 92 },
  { id: 'w4', name: 'Terunofuji', power: 91, stamina: 84 },
]

export function seedMatches(count = 6): Match[] {
  const out: Match[] = []
  for (let i=0;i<count;i++) {
    const a = DEMO_WRESTLERS[i % DEMO_WRESTLERS.length]
    const b = DEMO_WRESTLERS[(i+1) % DEMO_WRESTLERS.length]
    out.push({ id: 'm'+i, a, b })
  }
  return out
}

// Super light deterministic-ish sim so UI can show something.
export function simulate(m: Match): Match {
  const aScore = m.a.power * 0.6 + m.a.stamina * 0.4 + (m.a.name.length % 7)
  const bScore = m.b.power * 0.6 + m.b.stamina * 0.4 + (m.b.name.length % 7)
  const winner = aScore >= bScore ? m.a.id : m.b.id
  return { ...m, winner, rounds: 1 + ((m.a.power + m.b.power) % 3) }
}
