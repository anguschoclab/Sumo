import React from 'react';
import { useBasho } from '../engine/store';
import { Link, NavLink } from 'react-router-dom';

export const HeaderControls: React.FC = () => {
  const { state, Basho } = useBasho();
  return (
    <header className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <Link to="/" className="font-semibold">SumoGame</Link>
        <nav className="flex items-center gap-3 text-sm">
          <NavLink to="/basho" className={({isActive}) => isActive ? 'font-semibold' : ''}>Basho</NavLink>
          <NavLink to="/divisions" className={({isActive}) => isActive ? 'font-semibold' : ''}>Divisions</NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Day {state.day}/15</span>
        <button
          className="px-3 py-1 rounded border hover:bg-gray-50"
          onClick={() => Basho.advanceDay()}
          disabled={state.day > 15}
          title="Advance Day"
        >Advance Day</button>
      </div>
    </header>
  );
};
