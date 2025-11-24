#!/usr/bin/env bash
set -euo pipefail

HDR="src/components/HeaderBar.tsx"
[ -f "$HDR" ] || { echo "❌ $HDR not found"; exit 1; }

# Skip if we've already added the effect
if grep -q "world:change" "$HDR"; then
  echo "• HeaderBar already listens for world:change – no changes made."
  exit 0
fi

# Ensure React hooks import has useEffect/useState
if grep -q "from 'react'" "$HDR"; then
  # add useEffect/useState if missing in the import line
  perl -0777 -pe "s/from 'react'\\);/from 'react');/g" -i "$HDR"
  perl -0777 -pe "s/import React(,\\s*\\{[^}]*\\})? from 'react';/import React, { useEffect, useState } from 'react';/g" -i "$HDR"
  perl -0777 -pe "s/import \\{([^}]*)\\} from 'react';/my \$x=\$1; \$x =~ /useEffect/ ? $_ : s/import \\{([^}]*)\\} from 'react';/import { \$1, useEffect, useState } from 'react';/er/eg" -i "$HDR" || true
fi

# Insert a small effect at the first component function export
awk '
  BEGIN{inserted=0}
  {
    print $0
    if(!inserted && $0 ~ /function HeaderBar\\(|const HeaderBar\\s*=\\s*\\(/){
      print "  const [, _force] = useState(0);"
      print "  useEffect(() => {"
      print "    const onChange = () => _force(v => v + 1);"
      print "    if (typeof window !== \"undefined\") {"
      print "      window.addEventListener(\"world:change\", onChange);"
      print "    }"
      print "    return () => {"
      print "      if (typeof window !== \"undefined\") {"
      print "        window.removeEventListener(\"world:change\", onChange);"
      print "      }"
      print "    };"
      print "  }, []);"
      inserted=1
    }
  }
' "$HDR" > "$HDR.tmp" && mv "$HDR.tmp" "$HDR"

echo "✅ Patched $HDR to react to world:change."
