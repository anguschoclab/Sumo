# Sumo — Reality Check & Sprint Replan
_Last updated: 2025-10-14T10:52:34Z_

## How this was assessed
- Cross‑checked your terminal logs and “always playable” baseline against the original sprint intent.
- Looked for concrete evidence: imports, missing exports, runtime errors, and the presence of modules (e.g. `@engine/skip`, `@state/flags`, `src/engine/time.ts`, `basho.ts`).
- Focused on things you called “Done” to verify **actually present**, otherwise marked **Partial** (works but thin) or **Missing** (not in canvas or only a stub).

---

## Reality Audit (feature-by-feature)

| Area | Intended Deliverable | Canvas Evidence | Status | Notes |
|---|---|---|---|---|
| **Boot & Shell** | Always‑Playable, offline, stubs, error boundaries | Baseline renders offline; stubs & error boundaries present; Start/ZIP flow ok | ✅ **Present** | Meets ship rules; good foundation |
| **Aliases & Build** | Vite aliases (`@components`, `@engine`, `@state`) | `vite.config.ts` + `tsconfig.json` patched | ✅ **Present** | Stable after cache clear |
| **HUD Controls** | Advance Day/Week, Next Basho, Cancel | Buttons render; missing exports were fixed (`flags`, `emitWorldChange`, `onWorldChange`, `toggleStopMode`) | 🟡 **Partial** | Works now, but logic is minimal; needs loop guard + UI state sync tests |
| **World/Time Engine** | `getWorld/setWorld`, events | `time.ts` present; `world.ts` present; world change event wired | 🟡 **Partial** | Eventing added; needs persistence tick hooks |
| **Basho Core** | Schedule, standings, torikumi wiring | `basho.ts` initially missing; placeholder added | ❌ **Missing/Stub** | Needs full scheduler + standings table |
| **Training & Matches** | Simple bout resolver, UI viewer | No `match` module found; no viewer modal present | ❌ **Missing** | Core for “C” sprint absent |
| **Yokozuna Council** | Governance panel, decisions | No council modules/routes referenced | ❌ **Missing** | Add panel + mocked proposals |
| **Rivalries & Scouting** | Rivalry model + scouting reports | No rivalry/scouting modules | ❌ **Missing** | Add scores, decay, report UI |
| **Shikona Generator** | Name generator, uniqueness | Not found | ❌ **Missing** | Wire to seed + Create Rikishi |
| **Economy & Sponsors** | Kenshō, expenses, income, ledger | Not found | ❌ **Missing** | Introduces accounting model |
| **Save/Load & Autosave** | Local snapshot, autosave toggle | Not seen in canvas | ❌ **Missing** | Add `localStorage` persistence |
| **Achievements/Progression** | Milestones, unlocks | Not found | ❌ **Missing** | |
| **Commentary/Procedural Text** | Event feed + commentary | Not found | ❌ **Missing** | |
| **Modularization** | Core split, packages | Not done | ❌ **Missing** | Large refactor sprint |

---

## Rebalanced Sprint Roadmap (by missing priority)

> Build types follow your rules: **Full** when introducing a new system or refactor; **Delta** when safely adding onto stable surfaces. Every Full must be **Always‑Playable**.

| Sprint | Build Type | Focus / Deliverables | Exit Criteria |
|---|---|---|---|
| **A** | Full (Baseline) | _Already shipped_ Always‑Playable shell, routing, theme, aliases, error boundaries | Opens from ZIP, stubs work |
| **B** | Delta | **World/Time solidification**: finalize `emitWorldChange`, loop guard, UI state sync; add autosave/save/load minimal | HUD reflects world changes reliably; autosave toggle persists |
| **C** | Full | **Training & Match Core**: bout resolver, training ticks, **Match Viewer** modal | Can run a bout, see outcome UI; training modifies attrs |
| **D** | Delta | **Shikona Generator** + uniqueness; seed uses it; Create-Rikishi modal | Generated names unique; visible in seed & modal |
| **E** | Full | **Basho Core v1**: real schedule, standings table, next-basho jump using scheduler | Calendar populates; standings update after bouts |
| **F** | Delta | **Rivalries & Scouting v1**: rivalry score, decay, scouting reports panel | Panel lists rivalries; reports render |
| **G** | Delta | **Economy v1 (Kenshō/expenses)** + ledger; sponsor stubs | Ledger view present; cash flow ticks in sim |
| **H** | Delta | **Event Feed** & notifications; commentary hooks (procedural text scaffolding) | Feed lists sim events; commentary lines show |
| **I** | Delta | **Governance (Yokozuna Council) v1**: proposals, votes, outcomes (mock) | Council panel interactive; decisions logged |
| **J** | Delta | **Achievements & Progression v1**: a few milestones + toasts | Achievements unlock; persisted |
| **K** | Full | **Modularization/Refactor**: split core (engine/ui/state), feature flags, proper barrels | App builds from modular packages; smoke tests pass |
| **L** | Delta | **Polish pass**: icons, nav hints, disabled tooltips, performance | Meets ship rules + a11y checks |
| **M** | Full | **Stability baseline**: integrated features above; packaging + preflight CI | One-click ZIP build, all smoke tests pass |

---

## Concrete Tasks per Near-Term Sprint

### Sprint B — World/Time Solidification (Delta)
- Add `loopGuard` around time advances to avoid runaway re-renders.
- Ensure `toggleStopMode` cycles Day → Week → Basho and reflects in HUD label.
- Add `useWorld()` hook that subscribes to `world:change` and memoizes derived date.
- Implement `saveWorld()/loadWorld()/autoSave` in `src/state/save.ts` with `localStorage`.
- **Preflight checks:** verify exports exist (`emitWorldChange`, `onWorldChange`, `flags`, `toggleStopMode`, `basho` symbols).

### Sprint C — Training & Match Core (Full)
- `src/sim/match.ts`: outcome resolver (speed, strength, technique), fatigue/injury seeds.
- `src/ui/MatchViewer.tsx`: modal showing rikishi cards, odds, result line.
- `src/sim/training.ts`: attribute deltas; integrate with day/week ticks.
- Wire HUD button “Spar” or context action to fire a demo bout.

### Sprint D — Shikona (Delta)
- `src/sim/shikona.ts`: weighted syllables, locale variants, collision check.
- Use in seeding and “Create Rikishi” flow; add uniqueness set and retry loop.

### Sprint E — Basho Core v1 (Full)
- `src/features/basho/schedule.ts`: official months and slates; torikumi generator stub.
- `src/features/basho/standings.ts`: win/loss, tie-breakers; table UI route `/basho`.
- Replace placeholder `nextBasho()` with schedule-driven jump.

…(rest as table above).

---

## Ship Rules (enforced for every Full)
- **Boot guarantee**: `index.html` opens without build steps.
- **Seeded demo data**: visible content even with empty storage.
- **Safe UI**: no dead buttons; tooltips on disabled actions.
- **Feature flags** with friendly fallbacks (“Coming soon” panes).
- **Error boundaries**: graceful recovery to Dashboard.
- **Offline mocks**: core features have local logic.
- **ZIP packaging check**: double‑clickable `Start Game.command` and `index.html`.

---

## Risks & Mitigations
- **Module drift** (missing exports) → Add preflight script to assert API surface before packaging.
- **Scope creep** in Basho/Economy → Stage v1 thin slices; deepen in deltas.
- **Refactor fallout** (K) → Freeze features during modularization; green-bar smoke suite.

---

## Definition of Done (per sprint)
- Builds from a **single ZIP** on macOS (double‑click) and from `index.html` directly.
- Passes **preflight** (aliases, required exports, seed presence, mock data).
- **Smoke tests**: HUD advance; open Match Viewer; navigate to Basho/Feed; save/load round trip.
