#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Applying delta: Button wiring + Dev manifest"

root="$(pwd)"

# --- helper: write file with backup ---
write_file () {
  rel="$1"
  shift
  abs="$root/$rel"
  dir="$(dirname "$abs")"
  mkdir -p "$dir"
  if [ -f "$abs" ]; then
    cp "$abs" "$abs.bak"
  fi
  cat > "$abs" <<'EOF'
'"$@"'
EOF
  echo "✔ Wrote: $rel"
}

# 1) HeaderBar.tsx – defensive imports + fallback to window
write_file src/components/HeaderBar.tsx $'
import { useEffect, useState } from "react";
// Use defensive relative imports to avoid alias drift
import { advanceDay as _advanceDay, advanceWeek as _advanceWeek } from "../engine/time";
// If skip helpers exist, we\'ll read them lazily to avoid import-time errors
let skipApi: any = null;
try {
  // Optional: avoid hard import to keep this resilient if file moves
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  skipApi = require("../engine/skip");
} catch (_) {
  skipApi = {};
}

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
  // fallbacks if imports are undefined (e.g., HMR stale graph)
  const advDay = (_advanceDay || (window as any)?.__dbg?.advanceDay) ?? (() => console.warn("advanceDay unavailable"));
  const advWeek = (_advanceWeek || (window as any)?.__dbg?.advanceWeek) ?? (() => console.warn("advanceWeek unavailable"));

  const [skipping, setSkipping] = useState<boolean>(!!(skipApi?.isSkipping?.()));
  const [paused, setPaused] = useState<boolean>(!!(skipApi?.isPaused?.()));

  useEffect(() => {
    // simple poll in dev to reflect skip flags if present
    const id = window.setInterval(() => {
      try {
        const s = !!(skipApi?.isSkipping?.());
        const p = !!(skipApi?.isPaused?.());
        setSkipping(s);
        setPaused(p);
      } catch {}
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
'

# 2) time.ts – ensure named exports + expose debug handles
#    (We are not changing your logic; we only add a tiny debug shim at the end.)
#    If this file doesn\'t exist yet, we create a minimal compatible one that calls through
#    to window.__WORLD__ so the buttons do something in dev.
if [ ! -f src/engine/time.ts ]; then
  mkdir -p src/engine
  cat > src/engine/time.ts <<'EOF'
type World = any;

// best-effort "world" accessors for dev
export const getWorld = ((): (() => World) => {
  return (window as any).__getWorld || (() => (window as any).__WORLD__ ||= { week: 1, day: 1 });
})();

export const setWorld = (nw: World) => {
  (window as any).__WORLD__ = nw;
  // notify simple listeners
  window.dispatchEvent(new CustomEvent("world:updated"));
};

function bumpDay(w: World) {
  w.day = (w.day || 1) + 1;
  if (w.day > 7) { w.day = 1; w.week = (w.week || 1) + 1; }
}

export function advanceDay() {
  const w = getWorld();
  bumpDay(w);
  setWorld({ ...w });
  console.log("[time] advanceDay → week/day:", w.week, w.day);
}

export function advanceWeek() {
  const w = getWorld();
  w.week = (w.week || 1) + 1;
  w.day = 1;
  setWorld({ ...w });
  console.log("[time] advanceWeek → week/day:", w.week, w.day);
}

// Debug exposure for UI fallbacks
// @ts-ignore
if (typeof window !== "undefined") {
  // @ts-ignore
  (window as any).__dbg = Object.assign({}, (window as any).__dbg, { advanceDay, advanceWeek });
}
EOF
  echo "✔ Created: src/engine/time.ts (minimal dev version)"
else
  # Append/debug expose if not present
  if ! grep -q "__dbg" src/engine/time.ts 2>/dev/null; then
    cat >> src/engine/time.ts <<'EOF'

// Debug exposure for UI fallbacks
// @ts-ignore
if (typeof window !== "undefined") {
  // @ts-ignore
  (window as any).__dbg = Object.assign({}, (window as any).__dbg, { advanceDay, advanceWeek });
}
EOF
    echo "✔ Patched: src/engine/time.ts (debug handles added)"
  else
    echo "• Skipped: src/engine/time.ts already exposes __dbg"
  fi
fi

# 3) Simplify manifest in dev to silence icon warnings
#    (We\'ll restore full PWA icon set during the UI/UX polish sprint.)
write_file public/manifest.webmanifest $'\
{\n\
  "name": "SumoGame",\n\
  "short_name": "SumoGame",\n\
  "start_url": "/",\n\
  "display": "standalone",\n\
  "background_color": "#0b0b0b",\n\
  "theme_color": "#0b0b0b"\n\
}\n\
'

echo "✅ Delta applied."
