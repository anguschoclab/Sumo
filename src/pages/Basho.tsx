import React from 'react';
import { useBasho } from '../engine/store';
import { LeaderBoard } from '../components/LeaderBoard';

export const BashoPage: React.FC = () => {
  const { state } = useBasho();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Basho Overview</h2>
      <div className="rounded-xl border p-4">
        <div className="font-medium mb-2">Today’s Bouts</div>
        <div className="space-y-2">
          {state.bouts.map(b => (
            <div key={b.id} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{b.division}</span>{' '}
                <span>Day {b.day}</span>
              </div>
              <div>
                <span>{b.east}</span>{' '}vs{' '}
                <span>{b.west}</span>
                {b.winner && <span className="ml-2">→ Winner: {b.winner}{b.fusen ? ' (fusen)' : ''}</span>}
              </div>
            </div>
          ))}
          {state.bouts.length === 0 && <div className="text-sm text-gray-500">No scheduled bouts.</div>}
        </div>
      </div>
      <LeaderBoard />
      {state.champions && (
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-1">Champions</div>
          <div className="text-sm">Makuuchi: {state.champions.Makuuchi || '—'}</div>
          <div className="text-sm">Jūryō: {state.champions.Juryo || '—'}</div>
        </div>
      )}
    </div>
  );
};
