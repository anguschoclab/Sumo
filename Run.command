#!/usr/bin/env bash
set -e

HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

if [[ "$1" == "--clean" ]]; then
  echo "🧹 Cleaning caches and node_modules…"
  rm -rf node_modules dist .vite
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SumoGame – Sprint K (Consolidated)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔧 Ensuring dependencies…"
if [[ ! -d node_modules ]]; then
  npm install
else
  npm install --silent >/dev/null 2>&1 || true
fi

echo "✅ Dependencies ready."
echo ""
echo "🚀 Launching Vite dev server…"
npm run dev
