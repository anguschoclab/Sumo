import React from 'react';
import { useBasho } from '../engine/store';

export const LeaderBoard: React.FC = () => {
  const { state, Basho } = useBasho();
  const leaders = {
    makuuchi: Basho.computeLeaders('Makuuchi'),
    juryo: Basho.computeLeaders('Juryo')
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Leaders — Day {state.day}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <div className="font-medium">Makuuchi</div>
          <div>{leaders.makuuchi.name || '—'}</div>
          <div className="text-sm text-gray-600">{leaders.makuuchi.record}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="font-medium">Jūryō</div>
          <div>{leaders.juryo.name || '—'}</div>
          <div className="text-sm text-gray-600">{leaders.juryo.record}</div>
        </div>
      </div>
    </div>
  );
};
