import React from "react";
import { isBashoMonth, getTorikumi, state as bashoState, startBashoIfNeeded } from "../engine/basho";
import { getWorld } from "../engine/store";

export default function BashoPanel() {
  const w = getWorld();
  const bashoActive = isBashoMonth(w.month);
  startBashoIfNeeded();

  return (
    <div className="panel">
      <div className="row">
        <div>🏟️ <b>Basho</b></div>
        {bashoActive ? (
          <div className="muted">— {w.year}/{String(w.month).padStart(2,"0")} (Day {bashoState.day})</div>
        ) : (
          <div className="muted">— No hon-basho this month. Advance weeks until Jan/Mar/May/Jul/Sep/Nov.</div>
        )}
      </div>
      {bashoActive && (
        <div style={{marginTop:8}}>
          <div><b>Day {bashoState.day} Torikumi</b></div>
          <ul>
            {getTorikumi().map((b,i)=>(
              <li key={i}>{b.east} vs {b.west}</li>
            ))}
          </ul>
          <div className="muted">This is a minimal basho simulation for layout and flow. Full rules/real data come later.</div>
        </div>
      )}
    </div>
  );
}