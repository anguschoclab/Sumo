// src/components/ScoutingPanel.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { ensureScouting, listProspects, scoutMore, inviteVisit, offerToJoin, Prospect } from "../engine/scouting";
import "../styles/scouting.css";

declare global { interface Window { __mountScoutingDock?: ()=>void; }}

const GradeBadge: React.FC<{grade: Prospect["grade"], varr: number}> = ({grade, varr}) => {
  return <span className={`sg-badge sg-badge--${grade}`}>{grade}<small>±{Math.round(varr*10)}</small></span>;
};

export const ScoutingDock: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [pros, setPros] = useState<Prospect[]>([]);
  const refresh = () => { try{ ensureScouting(); setPros([...listProspects()]); }catch{} };
  useEffect(()=>{ refresh(); }, []);

  useEffect(()=>{
    // expose for hotkeys-entry to mount safely once
    (window as any).__SCOUTING_REFRESH__ = refresh;
  }, []);

  return (
    <>
      <button className="sg-fab" onClick={()=>{ setOpen(true); refresh(); }} title="Open Scouting (Sprint M)">🔍 Scouting</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="Scouting — Prospects">
        <div className="sg-table">
          <div className="sg-row sg-row--head">
            <div>Name / Origin</div><div>Vitals</div><div>Style</div><div>Hand / Grip</div><div>Traits</div><div>Grade</div><div>Actions</div>
          </div>
          {pros.map(p=>(
            <div className="sg-row" key={p.id}>
              <div><strong>{p.name}</strong><br/><small>{p.origin}</small></div>
              <div>{p.weightKg}kg • {p.heightCm}cm</div>
              <div>{p.style}</div>
              <div>{p.handedness} • {p.grip}</div>
              <div>{p.traits.slice(0,2).join(", ")}</div>
              <div><GradeBadge grade={p.grade} varr={p.gradeVar}/></div>
              <div className="sg-actions">
                <button className="sg-btn" onClick={()=>{ scoutMore(p.id); refresh(); }}>Scout more</button>
                <button className="sg-btn" onClick={()=>{ inviteVisit(p.id); alert("Visit scheduled!"); }}>Invite</button>
                <button className="sg-btn sg-btn--primary" onClick={()=>{ const val = prompt("Monthly stipend offer (¥)", "0"); if(val!=null){ offerToJoin(p.id, parseInt(val||"0",10)||0); refresh(); }}}>Offer</button>
              </div>
            </div>
          ))}
          {pros.length===0 && <div className="sg-empty">No prospects yet. Advance a week to generate a pool.</div>}
        </div>
        <p className="sg-hint">Weekly: new prospects spawn; scouted info tightens; offers may be accepted if interest is high.</p>
      </Modal>
    </>
  );
};

// Auto-mount once the script is imported (like GlobalTimeDock pattern)
(function mountOnce(){
  const id = "sg-scouting-dock-root";
  if (document.getElementById(id)) return;
  const div = document.createElement("div");
  div.id = id;
  document.body.appendChild(div);
  // lazy import ReactDOM only when needed
  import("react-dom/client").then(({createRoot})=>{
    const root = createRoot(div);
    root.render(React.createElement(ScoutingDock));
  }).catch(()=>{});
})();
