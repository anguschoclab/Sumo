import React from 'react';
import { BanzukeTable } from '../components/BanzukeTable';

export const DivisionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Divisions</h2>
      <section className="rounded-xl border p-4">
        <h3 className="font-semibold mb-2">Makuuchi</h3>
        <BanzukeTable division="Makuuchi" />
      </section>
      <section className="rounded-xl border p-4">
        <h3 className="font-semibold mb-2">Jūryō</h3>
        <BanzukeTable division="Juryo" />
      </section>
    </div>
  );
};
