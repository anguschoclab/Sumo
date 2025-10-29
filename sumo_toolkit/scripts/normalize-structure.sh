#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob
echo "→ Normalizing project structure..."
for d in src src/components src/engine src/state src/data src/utils public docs tmp; do
  [[ -d "$d" ]] || { echo "  • creating $d"; mkdir -p "$d"; }
done
move_if_absent () { local from="$1" to="$2"; if [[ -e "$from" && ! -e "$to" ]]; then
  echo "  • moving $from -> $to"; mkdir -p "$(dirname "$to")"; mv "$from" "$to"; fi; }
move_if_absent "components/HeaderBar.tsx" "src/components/HeaderBar.tsx"
move_if_absent "engine/world.ts" "src/engine/world.ts"
move_if_absent "engine/skip.ts" "src/engine/skip.ts"
move_if_absent "engine/time.ts" "src/engine/time.ts"
move_if_absent "state/flags.ts" "src/state/flags.ts"
move_if_absent "data/seed.ts" "src/data/seed.ts"
echo "✓ Structure normalized."
