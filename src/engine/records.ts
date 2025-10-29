
// Minimal W–L registry for a single basho window.
export type RecordRow = { shikona: string; wins: number; losses: number };

type Table = Map<string, { wins: number; losses: number }>;
const table: Table = new Map();

export function clearRecords() {
  table.clear();
}

export function awardWin(winner: string, loser: string) {
  const w = table.get(winner) ?? { wins: 0, losses: 0 };
  const l = table.get(loser) ?? { wins: 0, losses: 0 };
  w.wins += 1;
  l.losses += 1;
  table.set(winner, w);
  table.set(loser, l);
}

export function getTable(): RecordRow[] {
  const rows: RecordRow[] = [];
  for (const [shikona, rec] of table.entries()) {
    rows.push({ shikona, wins: rec.wins, losses: rec.losses });
  }
  rows.sort((a, b) => b.wins - a.wins || a.losses - b.losses || a.shikona.localeCompare(b.shikona));
  return rows;
}
