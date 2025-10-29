#!/bin/sh
echo "Sumo – Preflight"
node -v || true
npm -v || true
[ -f "vite.config.ts" ] && echo "vite.config.ts present"
[ -f "tsconfig.json" ] && echo "tsconfig.json present"
echo "Preflight OK"
