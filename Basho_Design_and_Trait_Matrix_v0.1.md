# **Basho — Design & Engineering Reference (Consolidated)**
**Version:** v0.1 • **Owner:** Product (you) • **Tech/Design:** ChatGPT (writer, engineer, etc.)  
**Baseline to build from:** `Sumo_Vite_v0.3.4_SprintK2K3_Delta.zip` → next deltas layered on top

---

## 0) Purpose
This single file consolidates our product vision, “always‑playable” ship rules, architecture, data contracts, narrative systems (Ink), procedural generation (names, personalities, rivalries), and a practical **Trait Matrix** for Rikishi/Heya/Coaches/Oyakata. It also documents the current roadmap and packaging requirements (ZIP‑first, macOS friendly).

---

## 1) Vision & Player Fantasy
You’re the Oyakata shaping a stable across seasons—discovering prospects, training styles, managing finances, reading newsletters, and guiding rivals through the Basho calendar. **Basho** should feel like a living circuit: seasonal tone, fighter trajectories, upsets, story lines, and a league that remembers.

Key goals:
- **Always playable** (zero-setup ZIP): index.html loads, stub flows exist, and demo data seeds automatically.
- **Readable stories**: fight reports + newsletters that weave rivalries, seasonal flavor, and player decisions.
- **Deterministic but expressive**: seeded runs are stable, but diverge as soon as player choices enter.

---

## 2) “Always‑Playable” Ship Rules (applies to Static & Vite builds)
- **Boot guarantee:** `index.html` opens and renders without network/build steps.
- **Seeded demo data:** if storage/API is empty, auto-seed a small stable so screens aren’t blank.
- **Safe UI by default:** buttons open modals/stub flows; disabled states show a tooltip with a hint.
- **Feature flags w/ fallbacks:** unfinished features show “Coming soon” and never break navigation.
- **Error boundaries:** friendly message + “Back to Dashboard” instead of crashes.
- **Offline mocks:** Features have local mock logic and don’t require a server.
- **ZIP packaging check:** double‑click **Start Game.command** (macOS) *or* open `index.html` must work.
- **Preflight:** a shell script validates aliases, flags, ink packs present, and minimal assets exist.

---

## 3) Tech Stack (macOS‑first, ZIP‑friendly)
**UI & Platform**
- React + Vite (static export OK); TailwindCSS + Radix UI components
- Zustand (+ Immer) for state; split **worldStore / uiStore / runtimeStore**

**Determinism, Data & Persistence**
- `seedrandom` for single-source RNG (global seed in `world.meta.seed`)
- Zod schemas for **data contracts** and save-file validation/migrations
- **Dexie.js (IndexedDB)** for large offline saves; **pako** compression for bulky transcripts
- `JSZip` (+ `pako`) for **Export/Import Save** and delta packs
- `nanoid` for short collision-safe IDs
- `date-fns` for calendar math

**Background work & Performance**
- Web Worker + `comlink` for sim loops (rounds, whole basho) off main thread

**Narrative**
- **Ink (inkjs)** runtime in browser; `.ink` compiled to JSON; packs live in `/content/packs`

**Charts & Audio**
- `recharts` for KPIs; reserve `d3` for custom, hand-crafted visualizations
- `howler.js` (optional) for low-key SFX; muted by default

**Testing & Tooling**
- Vitest (unit), Playwright (flow), preflights for ZIP‑sanity, tsup/rollup for workers

---

## 4) Architecture (high-level)
```
/apps/web (Vite)            — UI, pages, components, theme, Zustand stores
/packages/game-core         — Domain models, systems (basho, fights, finance), RNG, rules
/packages/contracts         — Zod schemas, event definitions, savefile versions
/content/packs              — Ink storylets (seasonal, rivalry, newsletter), lexicons
/workers                    — Sim worker (round/basho), import/export worker
/scripts                    — Preflights, packaging, alias patches (macOS .command)
```

**Event system (immutable, append-only)**
```ts
type GameEvent = {
  id: string; version: '1.0';
  when: IsoDateString;               // sim clock
  type: 'FightScheduled' | 'BoutResult' | 'Injury' | 'RivalrySpark' | ...;
  targetIds: string[];
  payload: Record<string, unknown>;
};
```
- Events validated by Zod. Dispatcher routes to systems (Finance, Rivalries, Ratings, Newsroom).
- UI subscribes to a **derived state cache** (recomputable).

---

## 5) Procedural Generation Overview
**What we generate**
- **Shikona**: culturally flavored surnames + epithet rules; uniqueness enforced w/ `nanoid` suffix if needed.
- **Personality profiles**: Big‑Five vector + domain traits; *role-specific weights* (see matrix below).
- **Rivalries**: spawned from style clashes, rank contention, historical outcomes; decays/escalates.
- **Fight scripts**: move selection shaped by style, attributes, fatigue, **kimarite** table (82 techniques).
- **Seasonal narrative**: per‑basho tone (Hatsu/New Year, Haru/Spring, Natsu/Summer, Nagoya, Aki/Autumn, Kyushu/Winter) used by Ink content and newsletter copy.

**Determinism vs. replayability**
- Same seed → same base world; **player choices** branch outcomes immediately (roster, training plan, match orders).

---

## 6) Ink (inkjs) Integration
- **Newsletter storylets** pull from: standings deltas, streaks, rivalry heat, upset index, injuries, prospects.
- **Rivalry pack**: snippets that escalate rhetoric as “heat” rises; cool‑downs after time or decisive results.
- **Seasonal pack**: tone words & metaphors per basho; opening paragraphs and headline sets.
- **Tourney/fight reports**: use event payloads (e.g., kimarite, clock time, grip) to drive templated but varied prose.

Example Ink variable contract (read-only from game core):
```
VAR oyakata_name       = "—"
VAR basho_name        = "Hatsu"
VAR rivalry_heat      = 0
VAR leader_streak     = 0
LIST KIMARITE = yorikiri, oshidashi, uwatenage, ...  // mirrored from TS
```
Ink receives **safe copies**; responses are pure text blocks + tags (e.g., `#headline`, `#lede`).

---

## 7) FTUE (First-Time User Experience)
- Lightweight **Welcome flow** (player name → heya name → preferred style goals).
- Seeds 3–5 rikishi with beginner-friendly stats + a tutorial newsletter issue.
- “Always‑playable” guard: if FTUE is skipped/abandoned, defaults are auto‑applied.

---

## 8) Basho Engine (Sprint K highlights)
- Full calendar, standings, match grid scaffolding.
- Buttons: Advance Day/Week, Next Basho, Cancel/Resume with **loop-safe** guards.
- Live standings hooks (K+2/K+3 deltas): press-box feed updates with sim events.
- **Live Sim Bridge (K+4)**: push bout results into the feed without UI button injection.

---

## 9) Trait Matrix (Rikishi / Heya / Coaches / Oyakata)
Scales are **0–100** unless noted; *weights* indicate how much the trait influences core systems.

### 9.1 Rikishi Traits
| Group | Trait | Meaning | Systems Affected | Weight |
|---|---|---|---|---|
| Physical | **Strength** | Raw power, clamp, lift | Yorikiri/oshidashi success, grip breaks | ★★★★☆ |
|  | **Mass** | Body mass & leverage | Ring control, push-out resistance | ★★★★☆ |
|  | **Balance** | Center control, footwork | Throw defense, edge recoveries | ★★★★☆ |
|  | **Agility** | Quick feet, lateral burst | Tachi-ai variations, slap-downs | ★★★☆☆ |
|  | **Endurance** | Fatigue curve, recovery | Back-to-back bouts, long matches | ★★★★☆ |
| Technical | **Grip Skill (Migi/Hidari)** | Belt technique preference & mastery | Kimarite selection, throw chains | ★★★★☆ |
|  | **Tachiai Timing** | Opening clash quality | Initiatives, early advantage | ★★★☆☆ |
|  | **Ringcraft** | Edge management, resets | Comebacks, forced errors | ★★★☆☆ |
| Mental | **Composure** | Tilt resistance | Error rate after setback | ★★★★☆ |
|  | **Aggression** | Willingness to initiate | Clash speed, push-outs vs throws | ★★★☆☆ |
|  | **Discipline** | Consistency to plan | Style adherence, coach influence | ★★★★☆ |
| Personality | **Showmanship** | Crowd appeal | Newsletter/headline bias | ★★☆☆☆ |
| Health | **Injury Risk** | Base susceptibility | Absences, performance dips | ★★★☆☆ |
| Derived | **Form** (dynamic) | Recent performance momentum | All move odds modifier | variable |

**Kimarite Biases (82 techniques)** are computed from physical + technical + style tags (e.g., *yotsu-zumo*).

### 9.2 Heya (Stable) Traits
| Trait | Meaning | Systems Affected | Weight |
|---|---|---|---|
| **Culture – Discipline** | Rules adherence | Injury avoidance, penalties | ★★★★☆ |
| **Culture – Innovation** | Willingness to experiment | New tactics adoption | ★★☆☆☆ |
| **Facilities** | Dojo quality, medical | Training effects, recovery | ★★★★☆ |
| **Scouting Network** | Prospect surface area | Quality of recruits | ★★★☆☆ |
| **Financial Health** | Cash runway | Sponsorship leverage, training | ★★★☆☆ |
| **Media Savvy** | PR & storytelling | Sponsor deals, fan heat | ★★☆☆☆ |

### 9.3 Coaches (per heya)
| Trait | Meaning | Systems Affected | Weight |
|---|---|---|---|
| **Technical Coach Skill** | Teaching throws/grips | Kimarite unlock/proc | ★★★★☆ |
| **Conditioning Skill** | Stamina programs | Endurance/Recovery | ★★★★☆ |
| **Tactical Prep** | Bout planning | Counter-style bonuses | ★★★☆☆ |
| **Mentorship** | Mental resilience | Composure, tilt control | ★★★☆☆ |
| **Style Specialty** | e.g., Yotsu/Oshi | Style-specific gains | ★★★★☆ |

### 9.4 Oyakata (Player)
| Trait | Meaning | Systems Affected | Weight |
|---|---|---|---|
| **Strategic Focus** | Long-term planning | Roster cycles, prospect dev | ★★★☆☆ |
| **Risk Appetite** | Aggressive vs cautious | Match orders, training gambles | ★★★☆☆ |
| **Financial Acumen** | Budget, sponsors | Income stability, upgrades | ★★★☆☆ |
| **People Mgmt** | Morale, conflict | Rivalry heat modulation | ★★★☆☆ |

**Interactions**
- Training plans = Coach strengths × Heya facilities × Rikishi discipline.
- Rivalry heat = outcome history + style clash + media savvy bias.
- Injury risk = base risk × conditioning × schedule density.

---

## 10) Data Contracts (Zod)
Example (Rikishi + Savefile excerpt):
```ts
import { z } from 'zod';

export const RikishiSchema = z.object({
  id: z.string(),
  shikona: z.string(),
  style: z.enum(['yotsu','oshi','mixed']),
  traits: z.object({
    strength: z.number().int().min(0).max(100),
    mass: z.number().int().min(0).max(100),
    balance: z.number().int().min(0).max(100),
    agility: z.number().int().min(0).max(100),
    endurance: z.number().int().min(0).max(100),
    gripMigi: z.number().int().min(0).max(100),
    gripHidari: z.number().int().min(0).max(100),
    composure: z.number().int().min(0).max(100),
    aggression: z.number().int().min(0).max(100),
    discipline: z.number().int().min(0).max(100),
    showmanship: z.number().int().min(0).max(100),
    injuryRisk: z.number().int().min(0).max(100),
  }),
  form: z.number().min(-20).max(20),
});

export const SaveSchema = z.object({
  version: z.literal('0.3.x'),
  meta: z.object({ seed: z.string(), createdAt: z.string() }),
  world: z.object({
    season: z.number(),
    bashoIndex: z.number(),
    rikishi: z.array(RikishiSchema),
    // ...
  }),
});
```

---

## 11) Roadmap (zip‑friendly)
| Sprint | Type | Focus / Deliverables | Notes |
|---|---|---|---|
| **A–G** | Mixed | Core UI, routing, theming, base models | ✅ Foundations |
| **H** | Full | Sim controls + persistence; autosave | ✅ |
| **I** | Delta | Trades & dynamic rivalries; decay/escalation | Next |
| **J** | Full | Event feed, time skip, basho scaffolding | Done in baseline lineage |
| **K** | Full | Basho engine core (schedule/standings/match UI) | ✅ |
| **K+1** | Delta | Standings UI polish | ✅ delivered |
| **K+2** | Delta | Live standings from press-box feed | ✅ delivered |
| **K+3** | Delta | Newsletter hooks for standings & streaks | ✅ delivered |
| **K+4** | Delta | **Live Sim Bridge** (push bout results) | In progress |
| **L** | Delta | FTUE pass (names, heya, tutorial issue) | Partly delivered |
| **M** | Full | Analytics: KPIs, recharts, exporter | |
| **N** | Delta | Audio sprinkles (howler), hotkeys | |
| **R** | Full | Modularization/refactor (core split) | |
| **S** | Delta | UI polish + icon/theme lock | |
| **T** | Full | “Year in Review” + Career Journal | |

*We keep each deliverable shippable via ZIP.*

---

## 12) Packaging & Preflight (macOS)
- **Start Game.command** (launches static or Vite preview with safety checks).
- **Preflight script** ensures: alias resolution, Ink packs present, content indexes valid, seeded demo loads.
- Zips named: `Basho_Vite_vX.Y.Z_Sprint…zip` or `Basho_Static_…zip` with a short **CHANGELOG.md** inside.

---

## 13) Appendix — Terminal Session Snapshot
Below is a trimmed record that motivated the JSX/Vite patch and newsletter/tourney delta injection (kept for future debugging context).

```text
VITE v7.1.12 ready …
Failed to parse source for import analysis … app.js:235 …
mv app.js → app.jsx
./tools/patch-react-vite.command  (syntax error fixed; idempotent check added)
./tools/patch-newsletter-tourney.command → injected <script type="module" src="delta/v1.4.3.js">
./tools/patch-el.command → helper hotfix
...
```
