// src/components/GlobalTimeDock.tsx
import React from "react";
import { advanceDay, advanceWeek } from "../engine\.\.\/engine\/time";

export function GlobalTimeDock() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "6px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        zIndex: 9999
      }}
    >
      Hotkeys: <strong>D</strong>=+Day, <strong>W</strong>=+Week
      <div style={{marginTop:"6px", display:"flex", gap:"6px"}}>
        <button onClick={() => advanceDay()}>+ Day</button>
        <button onClick={() => advanceWeek()}>+ Week</button>
      </div>
    </div>
  );
}
