
export const toISO = (d: Date)=> new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0,10);
export const addDays = (iso: string, days: number) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + days); return toISO(d); };
export const daysBetween = (aISO: string, bISO: string) => { const a = new Date(aISO + 'T00:00:00Z'); const b = new Date(bISO + 'T00:00:00Z'); return Math.round((b.getTime()-a.getTime())/86400000); };
export const ensureFutureBasho = (todayISO: string, nextISO?: string) => (!nextISO || daysBetween(todayISO, nextISO) <= 0) ? addDays(todayISO, 42) : nextISO;
