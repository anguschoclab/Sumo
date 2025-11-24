#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Fixing HeaderBar default export + time fallbacks + manifest link"

# 1) Force a valid HeaderBar with a default export
mkdir -p src/components
cat > src/components/HeaderBar.tsx <<'TSX'
import { useEffect, useState } from "react";
import { advanceDay as _advanceDay, advanceWeek as _advanceWeek } from "../engine/time";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    {...props}
    style={{
      marginRight: 8,
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #333",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      opacity: props.disabled ? 0.6 : 1
    }}
  >
    {children}
  </button>
);

export default function HeaderBar() {
  const advDay = (_advanceDay || (window as any)?.__dbg?.advanceDay) ?? (() => console.warn("advanceDay unavailable"));
  const advWeek = (_advanceWeek || (window as any)?.__dbg?.advanceWeek) ?? (() => console.warn("advanceWeek unavailable"));

  const [skipping, setSkipping] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      const skip = (window as any).__skipApi;
      setSkipping(!!skip?.isSkipping?.());
      setPaused(!!skip?.isPaused?.());
    }, 300);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log("[HeaderBar] advanceDay type:", typeof advDay, "advanceWeek type:", typeof advWeek);
  }, [advDay, advWeek]);

  return (
    <header style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#0b0b0b",borderBottom:"1px solid #222"}}>
      <strong style={{color:"#ffd36e"}}>🥋 SumoGame – Controls</strong>
      <div style={{marginLeft:12}}>
        <Button onClick={() => { console.log("[CLICK] + Day"); advDay(); }} disabled={!!skipping && !paused}>+ Day</Button>
        <Button onClick={() => { console.log("[CLICK] + Week"); advWeek(); }} disabled={!!skipping && !paused}>+ Week</Button>
      </div>
      <div style={{marginLeft:"auto",color:"#aaa",fontSize:12}}>
        {skipping ? (paused ? "⏸ Paused fast-forward" : "⏩ Fast-forwarding…") : "Ready"}
      </div>
    </header>
  );
}
TSX
echo "✔ Wrote src/components/HeaderBar.tsx (default export present)"

# 2) Ensure time.ts has named exports and debug fallbacks (no-op if already present)
mkdir -p src/engine
if ! grep -q "export function advanceDay" src/engine/time.ts 2>/dev/null; then
  cat > src/engine/time.ts <<'TS'
type World = any;
export const getWorld = (() => {
  return (window as any).__getWorld || (() => ((window as any).__WORLD__ ||= { week: 1, day: 1 }));
})();
export const setWorld = (nw: World) => {
  (window as any).__WORLD__ = nw;
  window.dispatchEvent(new CustomEvent("world:updated"));
};
function bumpDay(w: World) { w.day = (w.day || 1) + 1; if (w.day > 7) { w.day = 1; w.week = (w.week || 1) + 1; } }
export function advanceDay() {
  const w = getWorld(); bumpDay(w); setWorld({ ...w });
  console.log("[time] advanceDay → week/day:", w.week, w.day);
}
export function advanceWeek() {
  const w = getWorld(); w.week = (w.week || 1) + 1; w.day = 1; setWorld({ ...w });
  console.log("[time] advanceWeek → week/day:", w.week, w.day);
}
// expose debug fallbacks
if (typeof window !== "undefined") {
  (window as any).__dbg = Object.assign({}, (window as any).__dbg, { advanceDay, advanceWeek });
}
TS
  echo "✔ Wrote src/engine/time.ts (named exports + debug)"
else
  if ! grep -q "__dbg" src/engine/time.ts; then
    cat >> src/engine/time.ts <<'TS'

// expose debug fallbacks
if (typeof window !== "undefined") {
  (window as any).__dbg = Object.assign({}, (window as any).__dbg, { advanceDay, advanceWeek });
}
TS
    echo "✔ Patched src/engine/time.ts (added debug fallbacks)"
  else
    echo "• time.ts already exports + debug present"
  fi
fi

# 3) Manifest: provide valid JSON and fix link in index.html to manifest.webmanifest
mkdir -p public
cat > public/manifest.webmanifest <<'JSON'
{
  "name": "SumoGame",
  "short_name": "SumoGame",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0b0b0b",
  "theme_color": "#0b0b0b"
}
JSON
echo "✔ Wrote public/manifest.webmanifest"

if [ -f index.html ]; then
  cp index.html index.html.bak
  # macOS/BSD sed in-place syntax uses empty '' after -i
  sed -i '' -E 's/href="\/manifest\.json"/href="\/manifest.webmanifest"/' index.html || true
  sed -i '' -E 's/href="manifest\.json"/href="\/manifest.webmanifest"/' index.html || true
  echo "✔ Ensured index.html links to /manifest.webmanifest (backup: index.html.bak)"
fi

echo "✅ Done."
