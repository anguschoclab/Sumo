#!/bin/zsh
echo "== Basho — Apply v0.3.6 Delta (Auto‑Merge) =="

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

confirm_copy() {
  local src="$1"
  local dst="$2"
  if [ -e "$dst" ]; then
    read "ans?File exists: ${dst}. Overwrite? [y/N] "
    if [[ "$ans" != "y" && "$ans" != "Y" ]]; then
      echo "• Skipped: $dst"
      return
    fi
  fi
  mkdir -p "$(dirname "$dst")"
  cp -R "$src" "$dst"
  echo "• Copied: $(basename "$src") -> ${dst}"
}

# Copy sidecar files safely
confirm_copy "$ROOT_DIR/src/data/traits-matrix.schema.json" "./src/data/traits-matrix.schema.json"
confirm_copy "$ROOT_DIR/src/data/newsletter.templates.json" "./src/data/newsletter.templates.json"
confirm_copy "$ROOT_DIR/src/data/ftue.config.json" "./src/data/ftue.config.json"

# Ensure delta folder exists in project
mkdir -p "./delta"
confirm_copy "$ROOT_DIR/delta/v0.3.6.js" "./delta/v0.3.6.js"

echo ""
echo "• Done. You may now run:"
echo "    npm i"
echo "    npm run dev"
