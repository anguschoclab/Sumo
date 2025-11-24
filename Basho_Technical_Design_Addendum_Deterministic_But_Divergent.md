# Basho Technical Design Addendum – Deterministic but Divergent Architecture

**Date:** 2025-10-26
**Version:** 0.3.6 Addendum

---

## 🎯 Overview

This addendum formalizes Basho’s *Deterministic but Divergent* simulation model — a design that ensures consistent, debuggable world behavior while preserving infinite replayability through player choice, branching, and timing differences.

---

## 1. Deterministic Foundation

All world generation and simulation systems are **seeded deterministically** using a layered seed hierarchy:

| Layer | Example | Determinism Scope | Replay Effect |
|:------|:---------|:------------------|:---------------|
| 🌍 **World Seed** | `Basho_2025` | Base constants (names, traits, initial stables) | Each world is unique |
| 🏆 **Basho Seed** | `WorldA_Hatsu_Year2` | Tournament events, matchups, standings | Unique per basho |
| 📅 **Week Seed** | `WorldA_Hatsu_Year2_W2` | Weekly events, newsletters, injuries | Unique per week |
| 🧠 **Storylet Seed** | `Week2_storylet_rivalry1` | Ink.js flavor text, quotes, minor outcomes | Local variance |

Each layer is derived from the previous one to maintain coherence, while still allowing full replay variety.

---

## 2. Divergence Through Choice

While seeds ensure deterministic behavior, **player decisions introduce divergence**. Any player action — even something as small as changing a training focus — alters the RNG call sequence and therefore all subsequent outcomes.

### Example

```ts
rng = seedrandom('world-hoshinoya-6G')

rng() // used for match order
rng() // used for Shiranami's opponent
// Player trains — consumes one RNG call here
rng() // next fight outcome now changes
```

That one player action shifts the entire future RNG path — creating a new deterministic branch.

---

## 3. Ink.js Integration and Divergence

**Ink storylets** handle narrative flavor (newsletters, press snippets, quotes, FTUE). Each Ink story is deterministic within its seed context but diverges based on player choices, world tags, or timing.

- Ink variables (`rikishi`, `heya`, `wins`) are populated by the sim.
- The storylet chosen per section (headline, rivalry, quote) is deterministic for that week and world.
- However, the player’s path — which basho, which leader, which rivalries exist — changes what storylets even *qualify* to appear.

This creates *predictable branching*, not random chaos.

---

## 4. Event Sandbox Model

Each event (e.g., `MatchComplete`, `InjuryCheck`, `RivalryTrigger`) runs inside a **local RNG sandbox** derived from its parent event or world seed:

```
EventSeed = hash(WorldSeed + EventID)
```

That means each event can be rerun independently for debugging without affecting global state — crucial for replayable, reproducible simulation behavior.

---

## 5. Controlled Entropy Sources

Not every piece of randomness must be deterministic. Basho distinguishes between:

- **Deterministic RNG:** Simulation-critical outcomes (fights, stats, AI).
- **Non-deterministic flavor:** Ambient SFX, subtle background animations, crowd chatter — regenerated each load.

This ensures that cosmetic variety doesn’t compromise reproducibility.

---

## 6. Replayability Benefits

| Feature | Without Determinism | With Basho's Layered Determinism |
|:--|:--|:--|
| Save/Load integrity | Random drift, impossible to reproduce bugs | Perfectly reproducible |
| Narrative coherence | Text changes unpredictably | Story consistency per world |
| Debugging | Nondeterministic failures | Deterministic QA and logging |
| Replay variety | Random, chaotic | Structured, meaningful divergence |

Players can even share world seeds for “challenge worlds” — knowing that results will differ once choices and timing enter the loop.

---

## 7. Implementation Roadmap

This architecture integrates across sprints:

| Sprint | Feature | Purpose |
|:--|:--|:--|
| K+5 | Layered RNG Architecture | Deterministic seed hierarchy |
| K+6 | Event Sandbox Model | Reproducible event execution |
| K+7 | Ink.js Storylet Seeding | Deterministic newsletter flavor |
| K+8 | Controlled Entropy System | Cosmetic randomization layer |
| K+9 | Save/Load Replay Validation | QA harness for deterministic playback |

---

## ✅ Summary

> **Determinism ensures stability. Divergence ensures replayability.**

Basho’s simulation achieves both by separating *structure* (seeds and systems) from *agency* (player and AI choices). Each world evolves predictably — but never identically — making every save, every season, and every rivalry uniquely meaningful.

---
