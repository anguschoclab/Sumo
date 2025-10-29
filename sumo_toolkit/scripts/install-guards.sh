#!/usr/bin/env bash
set -euo pipefail
echo "→ Installing guards (error boundary, flags, seed)..."
mkdir -p "src/components" "src/state" "src/data" "docs"
cat > "src/components/AppErrorBoundary.tsx" <<'TSX'
import React from 'react';
type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: any };
export default class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  componentDidCatch(error: any, info: any) { console.error('[AppErrorBoundary]', error, info); }
  render() {
    if (this.state.hasError) {
      return (<div style={{ padding: 24 }}><h1>Something went wrong.</h1>
        <p>We hit a snag running the app.</p>
        <button onClick={() => (window.location.href = '/')}>Back to Dashboard</button></div>);
    }
    return this.props.children;
  }
}
TSX
cat > "src/state/flags.ts" <<'TS'
export const flags = {
  ALWAYS_PLAYABLE: true,
  NEWSLETTER_ENABLED: true,
  SEED_ON_BOOT: true,
  DEBUG_STANDINGS: false,
};
export function isEnabled(key: keyof typeof flags) { return Boolean(flags[key]); }
TS
cat > "src/data/seed.ts" <<'TS'
export function seedWorldIfEmpty() {
  try {
    const key = 'BASHO_SAVE_V1';
    const existing = localStorage.getItem(key);
    if (existing) return false;
    const demo = {
      meta: { version: '0.3.x', createdAt: new Date().toISOString() },
      heya: { name: 'Kaminari Beya', funds: 5000000 },
      rikishi: [
        { id: 'r1', shikona: 'Akeboshi', rank: 'M15', record: '0-0' },
        { id: 'r2', shikona: 'Hoshikaze', rank: 'J2', record: '0-0' },
      ],
      calendar: { today: '2025-01-01', mode: 'BetweenBasho', season: 2025 },
    };
    localStorage.setItem(key, JSON.stringify(demo)); return true;
  } catch (e) { console.warn('[seedWorldIfEmpty] failed:', e); return false; }
}
TS
cat > "docs/USAGE_GUARDS.md" <<'MD'
# Guards & Boot Safety
- **Error Boundary**: `src/components/AppErrorBoundary.tsx` – wrap `<App />` at the root.
- **Feature Flags**: `src/state/flags.ts` – runtime toggles.
- **Seed on Boot**: `src/data/seed.ts` – prepopulates demo data when no save exists.
MD
echo "✓ Guards installed."
