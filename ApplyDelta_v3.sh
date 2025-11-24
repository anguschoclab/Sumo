#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Applying SumoGame delta (v3)…"

fail() { echo "❌ $*"; exit 1; }

# Safe in-place replace using Perl with '#' delimiter (avoids '@' and '/')
replace() {
  local file="$1"
  local search="$2"
  local repl="$3"
  [[ -f "$file" ]] || fail "Missing file: $file"
  cp "$file" "$file.bak"
  perl -0777 -pe 's#\Q'"$search"'\E#\Q'"$repl"'\E#g' "$file.bak" > "$file"
  echo "✔ Patched: $file  ($search → $repl)"
}

cd "$(pwd)"

# 1) Fix basho import in engine/time.ts
if [[ -f "src/engine/time.ts" ]]; then
  replace "src/engine/time.ts" "./sim-basho" "./basho"
else
  echo "ℹ️ Skipped: src/engine/time.ts not found"
fi

# 2) Fix precedence in engine/basho.ts
if [[ -f "src/engine/basho.ts" ]]; then
  replace "src/engine/basho.ts" "day ?? state.day || 1" "(day ?? state.day) || 1"
else
  echo "ℹ️ Skipped: src/engine/basho.ts not found"
fi

# 3) HeaderBar: make imports relative and ensure default export
HB="src/components/HeaderBar.tsx"
if [[ -f "$HB" ]]; then
  replace "$HB" "@engine/skip" "../engine/skip"
  replace "$HB" "@engine/time" "../engine/time"
  if ! grep -q 'export default HeaderBar;' "$HB"; then
    printf '\nexport default HeaderBar;\n' >> "$HB"
    echo "✔ Added default export to HeaderBar.tsx"
  else
    echo "✔ HeaderBar.tsx already has default export"
  fi
else
  echo "ℹ️ Skipped: $HB not found"
fi

# 4) GlobalTimeDock: force relative engine imports
GTD="src/components/GlobalTimeDock.tsx"
if [[ -f "$GTD" ]]; then
  replace "$GTD" "@engine/time" "../engine/time"
  replace "$GTD" "@engine/store" "../engine/store"
else
  echo "ℹ️ Skipped: $GTD not found"
fi

# 5) Hotkeys entry: force relative engine imports
HK="src/hotkeys-entry.tsx"
if [[ -f "$HK" ]]; then
  replace "$HK" "@engine/time" "./engine/time"
  replace "$HK" "@engine/store" "./engine/store"
else
  echo "ℹ️ Skipped: $HK not found"
fi

echo "✅ Delta applied. Now run: ./Run.command --clean"
