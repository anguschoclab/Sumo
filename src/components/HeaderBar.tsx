import React, { useEffect, useState } from "react";
import { advanceDay, advanceWeek, getWorld } from "../engine/time";
import { nextBasho, getStopMode, setStopMode, pauseSkip, cancelSkip, isSkipping } from "../engine/skip";

type W = ReturnType<typeof getWorld>;

const HeaderBar: React.FC = () => {
  const [w, setW] = useState<W>(getWorld());
  const [mode, setMode] = useState(getStopMode());

  useEffect(() => {
    const onUpdate = () => setW(getWorld());
    const onSkip = () => setW(getWorld());
    window.addEventListener("world:updated", onUpdate);
    window.addEventListener("world:skip:tick", onSkip);
    window.addEventListener("world:skip:stop", onSkip);
    return () => {
      window.removeEventListener("world:updated", onUpdate);
      window.removeEventListener("world:skip:tick", onSkip);
      window.removeEventListener("world:skip:stop", onSkip);
    };
  }, []);

  const onDay = () => { console.log("[HeaderBar] + Day"); advanceDay(); };
  const onWeek = () => { console.log("[HeaderBar] + Week"); advanceWeek(); };
  const onNextBasho = () => { console.log("[HeaderBar] ⏭ Next Basho"); nextBasho(); };
  const onPause = () => { console.log("[HeaderBar] Pause"); pauseSkip(); };
  const onCancel = () => { console.log("[HeaderBar] Cancel"); cancelSkip(); };

  const stopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as any;
    setMode(v);
    setStopMode(v);
  };

  const skip = isSkipping();

  return (
    <header style={{
      display:"flex", gap:8, alignItems:"center", padding:"8px 12px",
      borderBottom:"1px solid #222", background:"#0b0b0b", color:"#fff",
      position:"sticky", top:0, zIndex:1000
    }}>
      <strong>🥋 SumoGame</strong>
      <span style={{opacity:0.8}}>Week {w.week}, Day {w.day}</span>
      <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
        <button onClick={onDay}>+ Day</button>
        <button onClick={onWeek}>+ Week</button>
        <button onClick={onNextBasho}>⏭ Next Basho</button>
        <select value={mode} onChange={stopChange} title="Auto-stop mode">
          <option value="BASHO_DAY1">Stop: Day 1</option>
          <option value="NAKABI">Stop: Nakabi (Day 8)</option>
          <option value="FINAL">Stop: Final (Day 15)</option>
          <option value="LEADER_CHANGE">Stop: Leader change</option>
          <option value="INJURY">Stop: Injury</option>
        </select>
        {skip ? <button onClick={onPause}>Pause</button> : null}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </header>
  );
};

export default HeaderBar;
