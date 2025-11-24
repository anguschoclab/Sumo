# 🏯 Basho Design Bible v2
*Generated: 2025-10-27 10:53:44*

---

## 🎮 Overview
**Basho** is a management simulation game that immerses players in the ancient, disciplined, and fiercely competitive world of sumo.  
Players manage a stable (*heya*), guide rikishi to glory, handle sponsorships, navigate rivalries, and maintain the legacy of their sumo lineage.

Built for offline play and narrative replayability, Basho combines deterministic simulation with narrative systems powered by **Ink.js**, procedural text generation, and seasonal tone variation.

---

## 🧩 Core Systems

### 1. Simulation Core
- Deterministic weekly loop (seeded RNG with `seedrandom`).
- Match and training progression.
- Basho (tournament) scheduling, bouts, and rankings.
- Procedural AI: rikishi personalities, stable culture, and rivalries.

### 2. Management Layer
- Stable operations (budget, training, scouting, upkeep).
- Sponsorship and Kenshō systems.
- Rivalries, injuries, fatigue, and morale.
- Recruitment and heya upgrades.

### 3. Narrative Layer
- Ink.js storylets for flavor text, rivalries, interviews, and newsletters.
- Seasonal tone modifiers.
- Procedural writing matrix ensures dynamic phrasing and variation.

### 4. UI / UX
- Tailwind + Radix UI.
- Responsive dashboards (Stable, Basho, Rikishi, Sponsors, Press).
- Global HUD (Week, Day, Basho indicators).
- Safe navigation and auto-seeded demo data (always playable).

---

## 🥋 Canonical Match Commentary System (Verbose Format)

### Structure
1. Context line (tone + rivalry/season setup).  
2. Multi-paragraph bout narration (tachiai → key exchanges → deciding move).  
3. Finishing flourish (crowd reaction, commentary reflection).

### Example 1 – *Hoshoryu vs Takakeisho – The Coiled Dragon and the Cannon*
> The hall trembled as Hoshoryu crouched low, eyes fixed like a hawk. Takakeisho’s breath came in measured bursts, his hands twitching like coiled springs. The tachiai cracked like thunder—both men slammed chest to chest, sand scattering in arcs of fury.  
> Hoshoryu slipped Takakeisho’s thrusts, pivoting, searching for an opening. One heartbeat—then another—and the Coiled Dragon struck. A deft sidestep, a grip, and the cannon misfired. The crowd’s gasp turned into a roar as Hoshoryu’s footwork danced victory across the ring.

### Example 2 – *Asanoyama vs Shodai – The Weight of Legacy*
> Autumn air hung thick in the Kokugikan. Shodai, ever the tactician, took his time. Asanoyama’s stance was heavy with history—every muscle carried expectation.  
> Their clash was methodical, precise—an echo of old sumo ideals. No wild charges, no reckless slaps—just willpower meeting endurance. When Shodai finally broke through Asanoyama’s grip, the crowd didn’t cheer—they exhaled.

---

## 🌸 Seasonal Tone Modifiers (Ink Tags)

| Season | Tone Keywords | Example Ink Tags | Commentary Feel |
|:-------|:---------------|:----------------|:----------------|
| **Haru (Spring)** | renewal, rivalry, awakening | `#season_spring #momentum_start` | Light, bright, hopeful — “The clay felt fresh beneath their feet.” |
| **Natsu (Summer)** | heat, endurance, volatility | `#season_summer #fury_heat` | Energetic, sweat-soaked, risk-laden — “Each breath shimmered in the air.” |
| **Aki (Autumn)** | reflection, legacy, redemption | `#season_autumn #wisdom_edge` | Measured, poetic, nostalgic — “The ring remembered old battles.” |
| **Fuyu (Winter)** | fatigue, mastery, perseverance | `#season_winter #grit_endure` | Sparse, stoic, gritty — “Every step was a war against exhaustion.” |

---

## 🧠 Procedural Writing Matrix (Personality & Tone Mapping)

| Trait Axis | Example Traits | Affects | Ink Modifiers | Sample Output |
|:------------|:---------------|:--------|:--------------|:--------------|
| **Personality Type (Rikishi)** | Aggressive / Stoic / Trickster / Scholar | Sentence rhythm & verb density | `#tone_aggressive` / `#tone_calm` | “He exploded from the crouch” vs “He waited, eyes unblinking.” |
| **Heya Style** | Traditional / Experimental / Corporate / Grassroots | Vocabulary + honorific tone | `#school_tradition` / `#school_modern` | “His grip spoke of centuries of discipline.” |
| **Oyakata Mentor Type** | Strict / Encouraging / Detached / Visionary | Commentary voice overlay | `#mentor_voice` | Adds subtle third-person “mentor quotes” to match wrap-up. |
| **Rivalry Status** | Heated / Respectful / Cold / Forgotten | Adds emotional charge & crowd reaction | `#rivalry_hot` / `#rivalry_respect` | “The crowd’s hush said everything.” |
| **Fatigue / Form** | Fresh / Tired / Injured | Sentence length, pacing | `#fatigue_heavy` / `#fatigue_light` | “He staggered, each breath a promise.” |

---

## 📰 Newsletter & Press Integration

- Ink.js storylets reference both **seasonal tone** and **trait matrix**.  
- Procedurally composes headlines and summaries.  
- Example headlines:
  - “🔥 Summer Heats Up — Takakeisho’s Fury Meets the Calm of Hoshoryu!”
  - “🍂 Autumn Reflections — Shodai’s Silent Comeback.”
- Post-basho reflections are narrated from the Oyakata’s personality perspective.
- Adds sections for:
  - *Fan Reactions*  
  - *Rumor Columns*  
  - *Top Techniques (Tokui-waza)*

---

## 🧩 Core Tech Stack (MacOS-Optimized)

| Layer | Tech | Purpose |
|:------|:------|:---------|
| Frontend | React (Vite) + TypeScript + Zustand + Immer | Game shell, state management, deterministic updates |
| UI | Tailwind + Radix UI + Framer Motion | Dynamic layout, smooth transitions |
| Narrative | Ink.js | Storylets, newsletters, dynamic commentary |
| RNG | seedrandom | Deterministic outcomes |
| Storage | Dexie.js (IndexedDB) | Save/load, offline durability |
| Compression | JSZip + pako | Export/import saves |
| Workers | comlink + Web Workers | Parallel sim for heavy basho logic |
| Validation | Zod | Schema, data contract enforcement |
| Audio | howler.js | Crowd noise, ambient sounds |
| Charts | Recharts | Stats and progress visualization |
| Search | Fuse.js | Fuzzy lookup for Rikishi, Stables |
| Date | date-fns | Lightweight date formatting |

---

## 🗂️ Project Roadmap (Updated)

| Sprint | Type | Focus | Description |
|:--------|:------|:------|:-------------|
| A–G | Full | Core Game & UI Foundation | Base shell, theming, state, training, and entity generation. |
| H | Full | Economy System | Kenshō, sponsors, dojo upkeep. |
| I | Delta | AI Rivalries & Events | Dynamic rivalries, sponsor tuning. |
| J | Full | Event Feed + Skip System | Feed updates, time controls, basho scaffolding. |
| K | Full | Basho Core + Match Engine | Standings, torikumi, match flow, verbose commentary. |
| L | Delta | Calendar & Skip Improvements | Auto-event generation and smoother sim pacing. |
| M | Full | Baseline Consolidation | Working save loop, HUD, basho, economy. |
| N | Delta | Heya Upgrades & Recruitment | Adds scouting and stable management. |
| O | Delta | Shikona Generator + Rival Flavor | Distinctive names, deeper AI variety. |
| P | Delta | Rikishi Personalities & Kimarite Links | Favorite grips, styles, handedness. |
| Q | Delta | Commentary + Seasonal Text System | Procedural narrative and tone adaptation. |
| R | Full | Modularization & Refactor | Splits engine into clean subsystems. |
| S | Full | FTUE + Tutorials | Onboarding: naming, first stable, guidance. |
| T | Full | Year in Review & Career Journal | Post-season summaries and long-term tracking. |
| U | Delta | UI/UX Polish | Full visual overhaul, icons, theming. |
| V | Full | QA & Optimization | Tech debt cleanup, dependency update. |
| W | Full | Final Launch Build | Complete, playable, narratively rich experience. |

---

## 📎 Integration Notes
- This file will ship with every full build inside `/docs/Basho_Design_Bible_v2.md`.
- Serves as the canonical reference for all narrative, simulation, and content generation systems.
