#!/usr/bin/env bash
set -euo pipefail
echo "▶ Applying Sprint K+2/K+3 delta..."
BASE="$(cd "$(dirname "$0")/.." && pwd)"
PROJ="$(pwd)"
copy_one () {
  rel="$1"
  src="$BASE/$rel"
  dst="$PROJ/$rel"
  mkdir -p "$(dirname "$dst")"
  if [ -f "$dst" ] && [ ! -f "$dst.bak" ]; then cp "$dst" "$dst.bak"; fi
  cp "$src" "$dst"
  echo "✓ Copied $rel"
}
copy_one "src/state/flags.ts"
copy_one "src/state/standings.ts"
copy_one "src/engine/events.ts"
copy_one "src/components/StandingsPanel.tsx"
copy_one "src/components/MatchdayLive.tsx"
echo "✔ Done. npm run dev"
