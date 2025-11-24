# Context Resume Guide

This document captures the full creative, technical, and production design context for the game **Basho** as of v0.2.  
If you’re resuming development in a new environment or ChatGPT session:

1. Upload this `.md` file at the start of the new chat.  
2. Say: “Use this as the full context for the Basho project.”  
3. I will automatically restore:
   - The sprint roadmap and delivery plan  
   - The design bible and feature intentions  
   - The tech stack, architecture, and build principles  
   - Visual and narrative direction  
4. All builds are zipped, macOS-ready, and adhere to the “Always-Playable Guarantee.”

_Last stable context: Basho Vite v0.3.4 (Sprint K2/K3 – Dynamic Standings)._


---

# 🎮 Basho — Design Bible & Delivery Roadmap v0.2

## 1. Vision & Overview

**Basho** is a character-driven, seasonal sumo management simulation built for MacOS.  
You play as the **oyakata** (stablemaster), guiding a stable of rikishi through the yearly basho circuit — managing training, scouting, finances, rivalries, and reputation.

The game blends deterministic simulation, procedural storytelling, and handcrafted narrative using **Ink.js**.  
Each basho season unfolds through systems-driven rivalries, personality clashes, and event-driven newsletters that evolve dynamically.

---

## 2. Core Design Pillars

- **Authenticity through abstraction** – captures the cadence and spirit of sumo without rote realism.  
- **Deterministic but alive** – every sim event derives from the same seeded logic, ensuring replayable consistency.  
- **Narrative through systems** – emergent drama arises from rivalries, fatigue, form, and personality interplay.  
- **Always playable** – all builds boot, display UI, and simulate minimal seasons even when features are incomplete.  

---

## 3. Simulation & World Systems

### World Model
- **Entities:** Rikishi, Stables (Heya), Coaches, Sponsors, Rivalries.
- **Cycles:** One in-game year = six basho (Jan, Mar, May, Jul, Sep, Nov).
- **Events:** Matches, training sessions, scouting discoveries, council votes, and press coverage.

### Deterministic Engine
- **Core RNG:** `seedrandom` — single seed per world ensures reproducibility.
- **Temporal flow:** Sim clock governs daily/weekly/monthly ticks.
- **Async simulation:** Web Worker + Comlink for smooth background sims.

---

## 4. AI & Procedural Personalities

### Personality Archetypes
Each stable member is generated using weighted traits influenced by cultural and training backgrounds:

| Role | Core Traits | Behavior Bias | Sample Flavor |
|------|--------------|----------------|----------------|
| **Oyakata (Stablemaster)** | Discipline, Patience, Prestige | Guides tone of stable (strict, nurturing, pragmatic) | “Legacy Keeper” or “Fallen Star Rebuilder” |
| **Coach** | Strategy, Aggression, Adaptability | Impacts training regimens & tactics | “The Iron Monk” or “Wildcard Mentor” |
| **Rikishi** | Power, Technique, Heart, Composure | Drives fighting style & temperament | “Showman”, “Iron Wall”, “Cannonball” |
| **Hechō (Assistant)** | Loyalty, Diligence, Cunning | Influences backstage outcomes | “The Quiet Fixer” |
| **Scout** | Curiosity, Instinct, Bias | Shapes recruitment pipeline | “Talent Whisperer” |

### Personality Matrix
Big-Five + Archetype hybrid:
- **Openness**, **Conscientiousness**, **Extraversion**, **Agreeableness**, **Neuroticism**  
Mapped to in-game tendencies: e.g., higher Openness → more creative kimarite use; lower Agreeableness → aggression during bouts.

### Rivalries
Rivalries are generated procedurally with:
- **Trigger:** match frequency, style overlap, or public narrative tension.
- **Decay:** cools if opponents are inactive or separated by division.
- **Amplifiers:** press coverage, sponsor bonuses, or fan rumors.

---

## 5. Narrative System (Ink.js Integration)

Ink.js powers dynamic storylets across:
- **Newsletters:** contextual recaps with seasonal flavor and quotes.  
- **Council sessions:** political dilemmas between stables.  
- **Rivalry events:** unique commentary branches.  
- **FTUE (First-Time User Experience):** onboarding narrative with choice moments.

Seasonal Ink text themes:
- **Haru Basho (Spring):** “Renewal, youth, hope.”
- **Natsu Basho (Summer):** “Intensity, heat, ambition.”
- **Aki Basho (Autumn):** “Reflection, rivalry, lessons learned.”
- **Fuyu Basho (Winter):** “Endurance, legacy, rebuilding.”

---

## 6. User Experience Flow (UX Wire Flow Map)

**High-Level Loop:**
1. **FTUE → Name stable + recruit initial rikishi.**
2. **Stable View:** Manage training, finances, and rivalries.
3. **Weekly Calendar:** Advance time by Day/Week or Skip to Next Basho.
4. **Basho Mode:** Match cards, torikumi results, live standings.
5. **Newsletter Recap:** Ink.js-generated story digest summarizing key rivalries, wins, and season tone.
6. **Offseason:** Rebuild, recruit, or reflect — player-driven pacing.

---

## 7. Technical Architecture

### Core Stack
| Layer | Tech | Purpose |
|-------|------|----------|
| **Frontend** | Vite + React + Tailwind | Fast, modern UI |
| **State** | Zustand + Immer | Immutable state management |
| **Simulation** | TypeScript core | Deterministic world logic |
| **Persistence** | Dexie.js (IndexedDB) | Offline save/load |
| **Events** | JSON + Zod validation | Structured replayable logs |
| **Compression** | Pako + JSZip | Compact save exports |
| **RNG** | seedrandom | Deterministic simulation |
| **Narrative** | Ink.js | Procedural story text |
| **Audio** | Howler.js | Optional immersive layer |
| **Search** | Fuse.js | Fuzzy in-game lookup |
| **Charts** | Recharts | Simple match/standing graphs |

---

## 8. Delivery Plan — Recalibrated Roadmap (v0.2)

| Sprint | Type | Focus | Status |
|---------|------|--------|--------|
| **A–G** | Full + Delta | Core UI, routing, world logic, and early sim | ✅ Complete |
| **H** | Full | Economy, dojo upkeep, sponsor logic | ✅ Complete |
| **I** | Delta | Economy tuning, ledgers, balance | ✅ Complete |
| **J** | Full | Event feed + skip/advance controls | ✅ Complete |
| **K** | Full | Basho core, standings, torikumi display | ✅ Complete |
| **K+1 → K+3** | Delta | Dynamic standings, live feed hooks, skip fixes | ✅ Complete |
| **K+4** | Delta | Live Sim Bridge, background updates | ⚙️ In Progress |
| **L** | Full | Achievements, unlocks, player progression | 🔜 Next |
| **M** | Full | Ownership metrics + rival analysis | Planned |
| **N** | Delta | UI/UX polish, icons, accessibility | Planned |
| **O** | Delta | Shikona + flavor text generator | Planned |
| **P** | Delta | Personalities, handedness, kimarite style biases | Planned |
| **Q** | Delta | Commentary + procedural writing tone | Planned |
| **R** | Full | Modular refactor (core split) | Planned |
| **S** | Delta | UI/UX polish atop modular architecture | Planned |
| **T** | Full | “Year in Review” + Career Journal recap | Planned |
| **U** | Delta | QA + optimization + bug cleanup | Planned |
| **V** | Full | Final release + story recap integration | 🚀 Final |

---

## 9. Packaging & Ship Rules

- **Boot Guarantee:** index.html opens standalone.  
- **Seeded Demo Data:** stable loads on first run.  
- **Safe UI:** buttons never dead-end; “Coming Soon” states used.  
- **Error Boundaries:** friendly fallback screens.  
- **Offline-Ready:** Dexie-powered persistence.  
- **Exportable Builds:** All shipped as `.zip` archives for macOS.  

---

## 10. Visual & Tone Appendix

- **Palette:** Muted indigo, rich beige, white, and deep red accents.  
- **Typography:** DM Mono + Saira SemiCondensed (Ubisoft Snowdrop lineage).  
- **Mood:** Elegant, contemplative, stoic — Japanese minimalism meets studio sim polish.  
- **Sound cues:** Low taiko drums, quiet audience murmur, ring gong.  

---

_Last updated: 2025-10-26 15:27:01_
