#!/usr/bin/env bash
set -euo pipefail
echo "→ Patching Vite aliases..."
CONFIG="vite.config.ts"; [[ -f "$CONFIG" ]] || CONFIG="vite.config.js"
if [[ ! -f "$CONFIG" ]]; then echo "  ! No vite.config.ts/js found. Skipping."; exit 0; fi
if ! grep -q "@components" "$CONFIG"; then
  echo "  • Injecting resolve.alias block"
  if ! grep -q "import { resolve as pathResolve } from 'path'" "$CONFIG"; then
    sed -i.bak "1s|^|import { resolve as pathResolve } from 'path'\n|" "$CONFIG" || true
    rm -f "$CONFIG.bak"
  fi
  if grep -q "resolve:" "$CONFIG"; then
    awk 'BEGIN{done=0} /resolve:/ && done==0 {print; print "    alias: {"
      print "      '@components': pathResolve(__dirname, 'src/components'),"
      print "      '@engine':     pathResolve(__dirname, 'src/engine'),"
      print "      '@state':      pathResolve(__dirname, 'src/state'),"
      print "      '@data':       pathResolve(__dirname, 'src/data'),"
      print "      '@utils':      pathResolve(__dirname, 'src/utils')"
      print "    },"; done=1; next} {print}' "$CONFIG" > "$CONFIG.tmp" && mv "$CONFIG.tmp" "$CONFIG"
  else
    cat >> "$CONFIG" <<'EOF'

export default {
  resolve: {
    alias: {
      '@components': pathResolve(__dirname, 'src/components'),
      '@engine':     pathResolve(__dirname, 'src/engine'),
      '@state':      pathResolve(__dirname, 'src/state'),
      '@data':       pathResolve(__dirname, 'src/data'),
      '@utils':      pathResolve(__dirname, 'src/utils'),
    }
  }
}
EOF
  fi
else
  echo "  • Aliases already present."
fi
echo "✓ Vite aliases patched."
