# Basho — Design Bible (Combat & Tachiai System Update)
_Last updated: 2025-10-28 12:09:58_

This section formalizes the deterministic-first combat loop, tachiai resolution, kimarite selection, and Ink.js narrative hooks. It is written to be zip‑friendly and data‑driven so we can ship playable builds without servers.

---

## 1) Combat Philosophy
- Deterministic-first. Outcomes primarily arise from stats (power, speed, balance, aggression, experience), styles, stance, and current form; RNG adds only micro‑variance (±5%) to avoid ties and keep results lively.
- Readable causality. The sim logs why something happened (e.g., tachiai power edge → push-dominant stance → oshidashi likelihood ↑).
- Narrative-first. Ink.js renders the bout story using structured variables from the sim (tachiai winner, stance, momentum, finisher, rivalry/seasonal tone).

---

## 2) Core Inputs per Rikishi
- Power – burst at tachiai, ability to drive/fight from center.
- Speed – reaction time, first touch, ability to create angles.
- Balance – footwork and anti-pull/anti-sidestep stability.
- Aggression – decisiveness at the line; lowers hesitation.
- Experience – composure, grip conversion, mistake avoidance.
- Momentum – recent form (soft ±10 band).
- Style – `oshi` (pusher), `yotsu` (grappler), or `hybrid`.

---

## 3) Bout Loop (Tachiai → Clinch/Struggle → Finisher)

### 3.1 Pseudocode (TypeScript-like, engine-facing)

```ts
// --- Types & helpers ---------------------------------------------------------
type Style = "oshi" | "yotsu" | "hybrid";
type Stance = "migi-yotsu" | "hidari-yotsu" | "no-grip" | "belt-dominant" | "push-dominant";
type Kimarite =
  | "oshidashi" | "yorikiri" | "uwatenage" | "shitatenage" | "hatakikomi"
  | "tsukiotoshi" | "sotogake" | "ketaguri" | "okuridashi" | "kotenage" | "uwatedashinage";

interface Rikishi {
  id: string;
  name: string;
  style: Style;
  power: number;      // 0..100
  speed: number;      // 0..100
  balance: number;    // 0..100
  aggression: number; // 0..100
  experience: number; // 0..100
  momentum: number;   // -10..+10 (soft form mod)
}

interface BoutState {
  clock: number; // abstract ticks
  fatigueA: number;
  fatigueB: number;
  stance: Stance;
  advantage: "A" | "B" | "none";
  tachiaiWinner: "A" | "B";
  log: string[]; // compact event log for UI + Ink
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const j = (pct = 0.05) => (Math.random() - 0.5) * pct; // replaced by seeded RNG

function styleMatchup(a: Style, b: Style): { A: number; B: number } {
  // Small, tunable bonuses. Example: stylistic comfort vs counter-style.
  if (a === "yotsu" && b === "oshi") return { A: +2, B: 0 };
  if (a === "oshi" && b === "yotsu") return { A: +2, B: 0 };
  return { A: 0, B: 0 };
}

// --- 1) TACHIAI --------------------------------------------------------------
function resolveTachiai(A: Rikishi, B: Rikishi, s: BoutState): "A" | "B" {
  const m = styleMatchup(A.style, B.style);

  const a =
    A.power * 0.40 +
    A.speed * 0.30 +
    A.balance * 0.10 +
    A.aggression * 0.15 +
    A.momentum * 0.05 + m.A + j();

  const b =
    B.power * 0.40 +
    B.speed * 0.30 +
    B.balance * 0.10 +
    B.aggression * 0.15 +
    B.momentum * 0.05 + m.B - j();

  const winner = a >= b ? "A" : "B";
  s.tachiaiWinner = winner;
  s.advantage = winner; // carry early edge forward (can be neutralized later)
  s.log.push(`tachiai|win=${winner}|a=${a.toFixed(1)}|b=${b.toFixed(1)}`);
  return winner;
}

// --- 2) CLINCH / STRUGGLE ----------------------------------------------------
function resolveClinch(A: Rikishi, B: Rikishi, s: BoutState): void {
  const adv = s.tachiaiWinner === "A" ? A : B;
  const opp = s.tachiaiWinner === "A" ? B : A;

  const gripBias =
    (adv.style === "yotsu" ? 12 : 0) - (opp.style === "oshi" ? 6 : 0) +
    (adv.experience - opp.experience) * 0.05;

  const pBelt = clamp01(0.5 + gripBias / 100 + j(0.02));

  if (pBelt > 0.55) {
    s.stance = "belt-dominant";
  } else if (pBelt < 0.35) {
    s.stance = "push-dominant";
  } else {
    s.stance = Math.random() < 0.5 ? "migi-yotsu" : "hidari-yotsu";
  }

  // Advantage may be neutralized in even grips
  if (s.stance === "migi-yotsu" || s.stance === "hidari-yotsu") s.advantage = "none";

  s.log.push(`clinch|stance=${s.stance}|adv=${s.advantage}`);
}

// --- 3) MOMENTUM / FATIGUE TICKS --------------------------------------------
function resolveMomentum(A: Rikishi, B: Rikishi, s: BoutState): void {
  const base = 1 + Math.abs(A.power - B.power) * 0.005;
  const exp = (A.experience + B.experience) / 2;
  const drain = clamp01(0.02 + (100 - exp) * 0.0005);

  s.fatigueA += base * drain * (s.advantage === "B" ? 1.2 : 1.0);
  s.fatigueB += base * drain * (s.advantage === "A" ? 1.2 : 1.0);
  s.clock += 1;

  s.log.push(`mom|fatA=${s.fatigueA.toFixed(2)}|fatB=${s.fatigueB.toFixed(2)}|t=${s.clock}`);
}

// --- 4) FINISHER (Kimarite) --------------------------------------------------
function resolveFinisher(A: Rikishi, B: Rikishi, s: BoutState): { winner: "A" | "B", kimarite: Kimarite } {
  const lead = s.advantage !== "none" ? s.advantage : s.tachiaiWinner;
  const leader = (lead === "A") ? A : B;
  const follower = (lead === "A") ? B : A;

  // Stance- and style-weighted pool (data-driven in production)
  let pool: [Kimarite, number][];
  if (s.stance === "push-dominant") {
    pool = [["oshidashi", 6], ["hatakikomi", 2], ["tsukiotoshi", 2]];
  } else if (s.stance === "belt-dominant" || s.stance === "migi-yotsu" || s.stance === "hidari-yotsu") {
    pool = [["yorikiri", 5], ["uwatenage", 3], ["shitatenage", 3], ["okuridashi", 1]];
  } else {
    pool = [["oshidashi", 4], ["yorikiri", 4], ["hatakikomi", 2]];
  }

  // Personalization nudges
  if (leader.style === "yotsu") pool.push(["uwatenage", 1]);
  if (leader.style === "oshi") pool.push(["hatakikomi", 1]);

  const pickWeighted = <T,>(items: [T, number][]): T => {
    const total = items.reduce((a, [, w]) => a + w, 0);
    let r = Math.random() * total;
    for (const [item, w] of items) { r -= w; if (r <= 0) return item; }
    return items[0][0];
  };

  const kimarite = pickWeighted(pool);

  // Rare counters: superior balance can flip outcomes in throws/pulls
  const counterChance = clamp01((follower.balance - leader.balance) * 0.01 + j(0.02));
  const flipped = Math.random() < counterChance * 0.1;

  const winner = flipped ? (lead === "A" ? "B" : "A") : lead;
  s.log.push(`finish|win=${winner}|kimarite=${kimarite}|flip=${flipped ? 1 : 0}`);

  return { winner, kimarite };
}

// --- Full bout ---------------------------------------------------------------
export function simulateBout(A: Rikishi, B: Rikishi) {
  const s: BoutState = {
    clock: 0, fatigueA: 0, fatigueB: 0, stance: "no-grip",
    advantage: "none", tachiaiWinner: "A", log: []
  };

  resolveTachiai(A, B, s);
  resolveClinch(A, B, s);

  // a few struggle ticks (data-driven in prod)
  for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) resolveMomentum(A, B, s);

  const { winner, kimarite } = resolveFinisher(A, B, s);
  return { winner, kimarite, stance: s.stance, tachiai: s.tachiaiWinner, log: s.log };
}
```

#### Determinism Notes
- Replace all `Math.random()` uses with a single injected seeded RNG (seedrandom).
- Log uses compact keys; a pretty renderer can translate them for UI/Ink.

---

## 4) Ink.js Integration (Newsletters, Fight Reports)
- The sim emits a context object each phase: `{ tachiaiWinner, stance, kimarite, fatigueA, fatigueB, rivalry, seasonalTag, upset, records: {a,b} }`.
- Ink storylets pick variants using these flags: rivalry heat adds barbs; seasonal tags (Hatsu/Natsu/etc.) provide color; upsets add surprise language.
- The verbose play‑by‑play uses names frequently and keeps tone grounded (reduced purple prose).

---

## 5) Seasonal & Rivalry Packs
- Seasonal text keyed to each basho adds local flavor, weather, and history beats.
- Rivalry pack injects lines when rival intensity ≥ threshold and biases post‑bout commentary.

---

## 6) Testing
- Golden bouts (fixed seeds) ensure regressions are visible.
- Distribution checks keep kimarite frequencies within target bands per stance/style.
- Property tests: illegal throw without grip is rare and flagged; counters require superior balance.

---

## 7) Roadmap Hooks
- Externalize kimarite/stance tables to CSV/JSON for tuning.
- Add injury/overextension micro‑events impacting momentum.
- Telemetry hook to collect stance & finisher distributions for balancing.
---
