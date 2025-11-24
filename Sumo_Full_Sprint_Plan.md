# Sumo — Full Sprint Plan (Recalibrated)
_Last updated: 2025-10-14 11:03 UTC_

This plan reflects the new **Always-Playable Baseline** and reconciles what exists in the canvas with the original A–M roadmap. Each sprint lists build type, focus, concrete deliverables, and current status.

---

## 🧭 Sprint Roadmap

| **Sprint** | **Build Type** | **Focus / Deliverables** | **Key Features & Details** | **Status** |
|:--|:--|:--|:--|:--|
| **A** | Full | Core UI, Routing, Layout (Baseline Shell) | Offline boot via `index.html` + `Run.command`; Tailwind + Radix UI; theme toggle; router (`Home`, `Settings`); error boundaries & fallback dashboard | ✅ Complete |
| **B** | Delta | World & Time Solidification | `time.ts` (`emitWorldChange`), `world.ts` (`onWorldChange`); `skip.ts` stable exports (`toggleStopMode`, etc.); loop guards; state sync; save/load/autosave (localStorage) | ⚙️ In progress |
| **C** | Full | Training & Match Core | `training.ts` growth (stamina/strength/technique); `match.ts` resolver (speed, power, technique); Bout simulation; **Match Viewer** modal; training hooks on day/week advance | 🔜 Planned |
| **D** | Delta | Shikona Generator + Recruitment Flow | `shikona.ts` (weighted syllables, uniqueness); Create-Rikishi modal; heya recruitment stub; nationality/style seed | 🔜 Planned |
| **E** | Full | Basho Core v1 (Tournament Engine) | `basho.ts` schedule; torikumi generation; standings + banzuke updates; `/basho` route; Skip-to-next basho; partial commentary lines | 🔜 Planned |
| **F** | Delta | Rivalries & Scouting v1 | Rivalry score (0–100); decay/escalation model; Scouting reports (rank/tendencies/potential); rivalry UI on rikishi card | 🔜 Planned |
| **G** | Delta | Economy v1 (Kenshō + Expenses) | Ledger with daily flow; dojo upkeep; Kenshō prize triggers; sponsor slots + negotiation stubs; budget dashboard mock | 🔜 Planned |
| **H** | Delta | Event Feed & Commentary System | Timeline of sim events; procedural text w/ seasonal tone; HUD badges; event detail modal | 🔜 Planned |
| **I** | Delta | Governance (Yokozuna Council v1) | Council proposals; vote logic (mock); promotions/demotions; council feed; player influence stat | 🔜 Planned |
| **J** | Delta | Achievements & Progression v1 | Milestones (promotion, 10 wins, earnings, etc.); achievement toasts; persistence; career history | 🔜 Planned |
| **K** | Full | Modularization & Refactor | Split into `@engine`, `@ui`, `@state`, `@sim`; shared type barrels; remove circular deps; automated preflight checks | 🔜 Scheduled |
| **L** | Delta | UI Polish & A11y Pass | Theme consolidation; icon/tooltip coverage; disabled states w/ hints; light/dark contrast QA | 🔜 Planned |
| **M** | Full | Final Stability Baseline Build | All prior features integrated; preflight + CI scripts; one‑click ZIP build; smoke tests; **Always-Playable** verification | 🔜 Release Target |

---

## 🔄 Cumulative Feature Map

| **Category** | **Feature** | **Earliest Sprint** | **Current State** |
|:--|:--|:--|:--|
| Simulation Core | World tick, Time skip, Basho cycle | A–E | Partial — skip works; standings/basho engine pending |
| Training & Matches | Attribute growth, bout resolution, viewer | C | Missing |
| Economy | Kenshō, sponsor income, expenses | G | Missing |
| Governance | Yokozuna Council proposals/votes | I | Missing |
| Rivalries & Scouting | Rivalry score, reports | F | Missing |
| Achievements | Milestone tracking | J | Missing |
| UI & Theming | Radix + Tailwind integration | A/F/L | Present |
| Persistence | Save/Load, autosave toggle | B | Stub only |
| Procedural Text | Event feed + commentary | H | Missing |
| Name Generation | Shikona generator + uniqueness | D | Missing |
| Modular Architecture | Code split + preflight | K | Not yet |
| Packaging | One‑click ZIP, offline boot | M | Baseline works |

---

## 📦 Release Cadence

| **Type** | **Criteria** | **Examples** |
|:--|:--|:--|
| Full Build (Major) | New system integration or architecture change | A / C / E / K / M |
| Delta Build (Minor) | Adds or extends stable surfaces | B / D / F / G / H / I / J / L |
| All Builds | Must satisfy **Always‑Playable** rules | index.html loads offline, seeded data, no dead buttons |

---

## ✅ Next Deliverables (Working Set)

1. **B — World/Time Solidification**
   - Complete autosave/load and world event propagation.
   - HUD sim mode indicator (Day/Week/Basho).
   - Preflight export checks to prevent import errors.

2. **C — Training & Match Core (Full)**
   - `match.ts` resolver and viewer modal.
   - Daily training + weekly sparring hooks.
   - Persist rikishi stats and history.

3. **D — Shikona Generator**
   - Generator + uniqueness enforcement.
   - Integrate into world seeding and recruitment modal.

---

## 🛡 Always‑Playable Ship Rules (Applied to Vite & Static)

- **Boot guarantee:** `index.html` opens and renders without network/build steps.
- **Seeded demo data:** If storage/API is empty, auto‑seed stable data.
- **Safe UI by default:** Buttons open modals with stub flows (no dead buttons) and disabled states show hints.
- **Feature flags w/ fallbacks:** Unfinished features show “Coming soon” panels; never block navigation.
- **Error boundaries:** Friendly message + “Back to Dashboard.”
- **Offline mocks:** Core features run with local mock logic.
- **ZIP packaging check:** Double‑click **Start Game.command** (macOS) or open `index.html` must work.

---

## 🔬 QA / Smoke Tests (per build)

- Open `index.html` offline → loads app shell, seeded data visible.
- Navigate Home → Settings → Basho (if present) without errors.
- Advance Day/Week/Basho → HUD updates; no console errors.
- Open all top‑level modals (Settings, Create Rikishi, Match Viewer) → no dead ends.
- Toggle theme → persists across reload.
- Save/Load → round‑trip localStorage works (for sprints with persistence).

