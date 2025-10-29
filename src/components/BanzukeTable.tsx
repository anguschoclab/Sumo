import React from 'react';
import { useBasho } from '../engine/store';
import { ranksOrder } from '../engine/divisions';

export const BanzukeTable: React.FC<{ division: 'Makuuchi' | 'Juryo' }> = ({ division }) => {
  const { state } = useBasho();
  const rows = state.rikishi
    .filter(r => r.division === division)
    .sort((a,b) => ranksOrder(a.rank) - ranksOrder(b.rank));

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2 pr-2">Rank</th>
          <th className="py-2 pr-2">Shikona</th>
          <th className="py-2 pr-2 text-center">Record</th>
          <th className="py-2 pr-2 text-center">Absent</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id} className="border-b">
            <td className="py-2 pr-2">{r.rank}</td>
            <td className="py-2 pr-2">{r.shikona}</td>
            <td className="py-2 pr-2 text-center">{r.record.wins}-{r.record.losses}</td>
            <td className="py-2 pr-2 text-center">{r.absent ? 'Yes' : '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
