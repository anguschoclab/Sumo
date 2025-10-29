#!/bin/zsh
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Opening Sumo (static) – index.html"
open -a "Safari" "$DIR/index.html" 2>/dev/null || open "$DIR/index.html"
