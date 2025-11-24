set -euo pipefail
echo "🔧 Fixing advanceDay/advanceWeek + HUD updates + favicon"

# 1) engine/time.ts – guaranteed world state + event dispatch
mkdir -p src/engine
cat > src/engine/time.ts <<'TS'
export type World = { year:number; month:number; week:number; day:number };
const DEF: World = { year: 2025, month: 1, week: 1, day: 1 };

function getW(): World {
  const g:any = (window as any);
  g.__WORLD__ ||= { ...DEF };
  // normalize (just in case)
  const w:World = g.__WORLD__;
  if (!w.year) w.year = DEF.year;
  if (!w.month) w.month = DEF.month;
  if (!w.week) w.week = DEF.week;
  if (!w.day)  w.day  = DEF.day;
  return w;
}

function emit() {
  try { window.dispatchEvent(new CustomEvent("world:updated")); } catch {}
}

export function setWorld(next: Partial<World>) {
  const g:any = (window as any);
  const cur = getW();
  g.__WORLD__ = { ...cur, ...next };
  emit();
}

export function advanceDay() {
  const w = getW();
  let { year, month, week, day } = w;
  day += 1;
  if (day > 7) { day = 1; week += 1; }
  // (simple rollover: every 4 weeks -> next month; 12 months -> next year)
  if (week > 4) { week = 1; month += 1; }
  if (month > 12) { month = 1; year += 1; }
  (window as any).__WORLD__ = { year, month, week, day };
  emit();
  // also return the new world for convenience
  return (window as any).__WORLD__;
}

export function advanceWeek() {
  const w = getW();
  let { year, month, week, day } = w;
  week += 1; day = 1;
  if (week > 4) { week = 1; month += 1; }
  if (month > 12) { month = 1; year += 1; }
  (window as any).__WORLD__ = { year, month, week, day };
  emit();
  return (window as any).__WORLD__;
}

export function getWorld(): World { return getW(); }
TS
echo "✔ Wrote src/engine/time.ts"

# 2) components/HeaderBar.tsx – call advance functions and log clearly
mkdir -p src/components
cat > src/components/HeaderBar.tsx <<'TSX'
import React from "react";
import { advanceDay, advanceWeek } from "../engine/time";

const HeaderBar: React.FC = () => {
  const onDay = () => { console.log("[CLICK] + Day"); advanceDay(); };
  const onWeek = () => { console.log("[CLICK] + Week"); advanceWeek(); };

  return (
    <header style={{
      display:"flex", gap:8, alignItems:"center", padding:"8px 12px",
      borderBottom:"1px solid #222", background:"#0b0b0b", color:"#fff",
      position:"sticky", top:0, zIndex:1000
    }}>
      <strong>🥋 SumoGame</strong>
      <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
        <button onClick={onDay}>+ Day</button>
        <button onClick={onWeek}>+ Week</button>
      </div>
    </header>
  );
};
export default HeaderBar;
TSX
echo "✔ Wrote src/components/HeaderBar.tsx"

# 3) world-wiretap.ts – (keep yours) ensure it exists; if missing, create minimal HUD
if [ ! -f src/world-wiretap.ts ]; then
  cat > src/world-wiretap.ts <<'TS'
type W = { week:number; day:number };
const getW = (): W => ((window as any).__WORLD__ ||= { week:1, day:1 });
const setHUD = () => {
  const w = getW();
  let el = document.getElementById("worldHud");
  if (!el) {
    el = document.createElement("div");
    el.id = "worldHud";
    Object.assign(el.style, {
      position:"fixed", right:"10px", bottom:"10px", zIndex:"9999",
      padding:"6px 10px", borderRadius:"6px",
      background:"#111", color:"#fff", font:"12px/1.2 -apple-system,system-ui,Segoe UI,Roboto",
      border:"1px solid #333", opacity:"0.9"
    });
    document.body.appendChild(el);
  }
  el.textContent = `Week ${w.week}, Day ${w.day}`;
};
window.addEventListener("world:updated", () => {
  const w = getW();
  console.log("[wiretap] world:updated → week/day:", w.week, w.day);
  setHUD();
});
document.addEventListener("DOMContentLoaded", setHUD);
setHUD();
TS
  echo "• Added minimal src/world-wiretap.ts"
else
  echo "• Using existing src/world-wiretap.ts"
fi

# 4) Ensure main.tsx imports the wiretap once at top
if grep -q 'world-wiretap' src/main.tsx 2>/dev/null; then
  echo "• main.tsx already imports world-wiretap"
else
  cp src/main.tsx src/main.tsx.bak
  printf '%s\n%s\n' 'import "./world-wiretap";' "$(cat src/main.tsx)" > src/main.tsx
  echo "✔ Added import './world-wiretap' to src/main.tsx (backup: src/main.tsx.bak)"
fi

# 5) Silence favicon 404 with a tiny placeholder
mkdir -p public/icons
# 1x1 transparent PNG
base64 -D > public/icons/icon-192.png <<'B64'
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=
B64
# Link favicon to that PNG (safe for dev)
if [ -f index.html ]; then
  cp index.html index.html.favicon.bak
  # drop any existing favicon link and add ours
  sed -i '' -E '/rel="icon"/d' index.html
  sed -i '' -E 's#</head>#  <link rel="icon" type="image/png" href="/icons/icon-192.png"/>\n</head>#' index.html
  echo "✔ Injected favicon into index.html (backup: index.html.favicon.bak)"
fi

echo "✅ Done. Restart your dev server."
