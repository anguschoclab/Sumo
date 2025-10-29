#!/usr/bin/env bash
set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Sumo – Apply Sprint A–L Delta v0.3.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

PROJECT_ROOT="$(pwd)"

# 1) Ensure directories
mkdir -p "src/views" "src/components" "src/state" "src/engine" "scripts"

# 2) Copy files (additive / overwrite with backup)
backup_copy () {
  local src_rel="$1"
  local dst_rel="$2"
  local src="$(dirname "$0")/../$src_rel"

  if [[ ! -f "$src" ]]; then
    echo "• WARN: missing delta file $src_rel (skipped)"
    return 0
  fi

  if [[ -f "$dst_rel" ]]; then
    cp "$dst_rel" "$dst_rel.bak_al_$(date +%s)"
    echo "• Backed up $dst_rel"
  fi

  mkdir -p "$(dirname "$dst_rel")"
  cp "$src" "$dst_rel"
  echo "✓ Wrote $dst_rel"
}

backup_copy "src/state/flags.ts" "src/state/flags.ts"
backup_copy "src/state/settings.ts" "src/state/settings.ts"
backup_copy "src/engine/match.ts" "src/engine/match.ts"
backup_copy "src/components/Modal.tsx" "src/components/Modal.tsx"
backup_copy "src/components/Tooltip.tsx" "src/components/Tooltip.tsx"
backup_copy "src/components/Toast.tsx" "src/components/Toast.tsx"
backup_copy "src/components/MatchCard.tsx" "src/components/MatchCard.tsx"
backup_copy "src/views/Training.tsx" "src/views/Training.tsx"
backup_copy "src/views/Shop.tsx" "src/views/Shop.tsx"
backup_copy "src/views/Tournament.tsx" "src/views/Tournament.tsx"
backup_copy "src/views/Stats.tsx" "src/views/Stats.tsx"

# 3) Safe route merge (hash-router style in src/main.tsx or src/App.tsx)
# We try to detect a simple router map and append routes if missing.
ROUTE_FILES=("src/App.tsx" "src/main.tsx")
for rf in "${ROUTE_FILES[@]}"; do
  if [[ -f "$rf" ]]; then
    if ! grep -q "Training" "$rf"; then
      # naive inject: add simple nav links if a placeholder comment exists; otherwise add a lightweight fallback section
      if grep -q "/* NAV_INJECT */" "$rf"; then
        perl -0777 -i -pe 's|/\* NAV_INJECT \*/|<a href="#/training">Training</a> · <a href="#/shop">Shop</a> · <a href="#/tournament">Tournament</a> · <a href="#/stats">Stats</a>|s' "$rf"
        echo "✓ Injected nav links into $rf"
      fi
      if grep -q "/* ROUTES_INJECT */" "$rf"; then
        perl -0777 -i -pe 's|/\* ROUTES_INJECT \*/|
          if (hash === "#/training") return <Training/>;
          if (hash === "#/shop") return <Shop/>;
          if (hash === "#/tournament") return <Tournament/>;
          if (hash === "#/stats") return <Stats/>;
        |s' "$rf"
        echo "✓ Injected routes into $rf"
      fi
    fi
  fi
done

# 4) Friendly summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Delta applied. You can now run: npm run dev"
echo "If anything looks off, check *.bak_al_* backups next to modified files."
