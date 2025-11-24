import React from "react";
import HeaderBar from "./components/HeaderBar";
import BashoPanel from "./components/BashoPanel";
import { getWorld } from "./engine/store";

export default function App() {
  const w = getWorld();
  return (
    <div className="wrap">
      <HeaderBar />
      <div className="panel">
        <div className="row">
          <div>🥋 <b>SumoGame — Sprint L</b></div>
          <div className="muted">Week {w.week}, Day {w.day}</div>
          <div className="muted">•</div>
          <div className="muted">Year {w.year}</div>
        </div>
      </div>
      <BashoPanel />
    </div>
  );
}