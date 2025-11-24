
import React, { useEffect, useMemo, useState } from 'react';
import { getState, getTorikumi, simulateToday, startBashoIfNeeded, isBashoMonth, getLeaderboard } from '../engine/basho';

function useNow(): Date {
  // Fallback clock; your global store may already track time — this is safe.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 1000000), 1000);
    return () => clearInterval(id);
  }, []);
  return new Date();
}

export default function BashoPage() {
  const now = useNow();
  const [rev, setRev] = useState(0);

  useEffect(() => {
    // Ensure basho starts on basho months
    startBashoIfNeeded(now);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now.getMonth()]); // only when month boundary changes

  const s = getState();
  const isHonBasho = isBashoMonth(now) && s.active;
  const torikumi = useMemo(() => getTorikumi(), [rev, s.day, s.active]);
  const leaders = useMemo(() => getLeaderboard(10), [rev]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🏟️ Basho</h2>
      {!isHonBasho && (
        <p>No hon-basho this month. Advance weeks until a basho month (Jan/Mar/May/Jul/Sep/Nov).</p>
      )}

      {isHonBasho && (
        <>
          <p>
            <strong>{s.year}/{String(s.month).padStart(2,'0')}</strong> — Day <strong>{s.day}</strong>
          </p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <h3>Day {s.day} Torikumi</h3>
              <ol>
                {torikumi.map((b, i) => (
                  <li key={i}>
                    {b.east} vs {b.west} {b.winner ? <> — <strong>{b.winner}</strong></> : null}
                  </li>
                ))}
              </ol>
              <button onClick={() => { simulateToday(); setRev(r=>r+1); }}>
                {s.day <= 15 ? 'Simulate Today' : 'Basho Complete'}
              </button>
            </div>

            <div>
              <h3>Leaders</h3>
              <ol>
                {leaders.map((row, i) => (
                  <li key={i}>{row.shikona} — {row.wins}-{row.losses}</li>
                ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
