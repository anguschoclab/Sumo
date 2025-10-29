#!/bin/zsh
echo "== Basho — Preflight =="
set -e

echo "• Node: $(node -v)"
echo "• npm : $(npm -v)"
if command -v vite >/dev/null 2>&1; then
  echo "• Vite: $(vite --version)"
else
  echo "• Vite not found — ok if you run via npm scripts"
fi

# Quick alias sanity (optional)
if [ -f "vite.config.ts" ]; then
  if ! grep -q "@components" vite.config.ts; then
    echo "• Note: vite.config.ts has no '@components' alias — project may be using relative imports."
  else
    echo "• Alias '@components' detected."
  fi
fi

echo "• Preflight OK."
