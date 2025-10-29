export function seedWorldIfEmpty() {
  try {
    const key = 'BASHO_SAVE_V1';
    const existing = localStorage.getItem(key);
    if (existing) return false;
    const demo = {
      meta: { version: '0.3.x', createdAt: new Date().toISOString() },
      heya: { name: 'Kaminari Beya', funds: 5000000 },
      rikishi: [
        { id: 'r1', shikona: 'Akeboshi', rank: 'M15', record: '0-0' },
        { id: 'r2', shikona: 'Hoshikaze', rank: 'J2', record: '0-0' },
      ],
      calendar: { today: '2025-01-01', mode: 'BetweenBasho', season: 2025 },
    };
    localStorage.setItem(key, JSON.stringify(demo)); return true;
  } catch (e) { console.warn('[seedWorldIfEmpty] failed:', e); return false; }
}
