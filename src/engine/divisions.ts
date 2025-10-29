export type Division = 'Makuuchi' | 'Juryo';
export type Rank =
  | 'Yokozuna' | 'Ozeki' | 'Sekiwake' | 'Komusubi'
  | 'Maegashira1' | 'Maegashira2' | 'Maegashira3' | 'Maegashira4' | 'Maegashira5'
  | 'Juryo1' | 'Juryo2' | 'Juryo3' | 'Juryo4' | 'Juryo5';

export interface Rikishi {
  id: string;
  shikona: string;
  division: Division;
  rank: Rank;
  record: { wins: number; losses: number; absences?: number };
  absent?: boolean; // kyujo
}

export const initialBanzuke: Rikishi[] = [
  { id: 'r1', shikona: 'Hakuyama', division: 'Makuuchi', rank: 'Yokozuna', record: { wins: 0, losses: 0 } },
  { id: 'r2', shikona: 'Kotonoumi', division: 'Makuuchi', rank: 'Ozeki', record: { wins: 0, losses: 0 } },
  { id: 'r3', shikona: 'Takanofuji', division: 'Makuuchi', rank: 'Sekiwake', record: { wins: 0, losses: 0 } },
  { id: 'r4', shikona: 'Asahisato', division: 'Makuuchi', rank: 'Komusubi', record: { wins: 0, losses: 0 } },
  { id: 'r5', shikona: 'Maegashira Kaze', division: 'Makuuchi', rank: 'Maegashira1', record: { wins: 0, losses: 0 } },

  { id: 'j1', shikona: 'Daiju', division: 'Juryo', rank: 'Juryo1', record: { wins: 0, losses: 0 } },
  { id: 'j2', shikona: 'Tosei', division: 'Juryo', rank: 'Juryo2', record: { wins: 0, losses: 0 } }
];

export function ranksOrder(rank: Rank): number {
  const order: Rank[] = [
    'Yokozuna','Ozeki','Sekiwake','Komusubi',
    'Maegashira1','Maegashira2','Maegashira3','Maegashira4','Maegashira5',
    'Juryo1','Juryo2','Juryo3','Juryo4','Juryo5'
  ];
  return order.indexOf(rank);
}
