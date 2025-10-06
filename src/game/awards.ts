
export const HONORS = {
  BOUT_OF_BASHO: 'Bout of the Basho',
  MATCH_OF_DAY: 'Match of the Day',
  TECHNIQUE_PRIZE: 'Technique Prize (Sanshō)',
  FIGHTING_SPIRIT_PRIZE: 'Fighting Spirit Prize (Sanshō)',
  OUTSTANDING_PERFORMANCE_PRIZE: 'Outstanding Performance (Sanshō)',
  YUSHO: 'Yūshō (Championship)',
  JUN_YUSHO: 'Jun-Yūshō (Runner-up)',
} as const;

export type HonorKey = keyof typeof HONORS;
export type RikishiHonors = { [honorLabel: string]: number };

export function grantHonor(state: any, rikishiId: string, honorKey: HonorKey, amount = 1) {
  state.rikishiHonors ??= {};
  const label = HONORS[honorKey];
  const map = (state.rikishiHonors[rikishiId] ??= {} as RikishiHonors);
  map[label] = (map[label] ?? 0) + amount;
}
