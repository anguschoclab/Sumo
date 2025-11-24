# Basho Seasonal & Rivalry Pack Design Specification

**Date:** 2025-10-26
**Version:** 0.3.7 Design Spec

---

## 🎯 Purpose

This document defines the design and implementation plan for **seasonal narrative text** and the **rivalry pack system** within *Basho*.  
The goal is to create richer newsletters, fight reports, and world flavor aligned with the real-world sumo calendar while deepening ongoing rivalries between rikishi.

---

## 🏮 1. Seasonal Basho Calendar Integration

Each of the six official basho is represented with unique seasonal tone, color, and story tags:

| Basho | Month | Theme | Seasonal Keywords | Visual Tone |
|:--|:--|:--|:--|:--|
| **Hatsu** | January | Renewal, resolve | `#freshstart`, `#coldair`, `#resolutions` | Cool whites, new-year banners |
| **Haru** | March | Rebirth, rivalry blooms | `#blossoms`, `#hope`, `#growth` | Pastel greens/pinks |
| **Natsu** | May | Energy, ambition | `#heat`, `#momentum`, `#risingstars` | Warm orange tones |
| **Nagoya** | July | Endurance, tension | `#endurance`, `#grit`, `#heatwave` | Hot red tones |
| **Aki** | September | Reflection, rivalry peaks | `#legacy`, `#focus`, `#balance` | Amber and bronze hues |
| **Kyushu** | November | Closure, mastery | `#honor`, `#farewell`, `#resolve` | Deep indigo and gold |

These values drive both **Ink.js storylet selection** and **UI theming**.

---

## 📰 2. Newsletter Storylet Framework (Ink.js)

Each newsletter issue draws from **seasonal** and **rivalry** Ink packs.

### Seasonal Storylets
```ink
=== headline_hatsu ===
~ temp tag = "winter"
A new year dawns on the dohyo. As snow falls outside Ryogoku, the sumo world awakens with fresh resolve.

=== headline_haru ===
~ temp tag = "spring"
The flowers bloom—and so do tempers! As {rikishi_name} faces {rival_name}, old grudges stir beneath the petals.
```

### Structure
| Section | Data Source | Description |
|:--|:--|:--|
| **Header** | Seasonal Ink tag (`seasonTag`) | Sets overall tone and imagery |
| **Main Story** | Rivalry Ink pack | Focused on top rivalries of the basho |
| **Quote Block** | Ink variables (rikishi, rival, outcome) | Dynamic post-match or pre-match remarks |
| **Footer** | Seasonal reflection or preview | Ties into next basho’s theme |

---

## ⚔️ 3. Rivalry Pack System

Each rivalry is tracked as a **lightweight state object**:

```ts
interface Rivalry {
  id: string;
  rikishiA: string;
  rikishiB: string;
  intensity: number; // grows with bouts, falls over time
  lastClash: string; // date or basho
  tags: string[]; // e.g., "blood", "regional", "mentor"
}
```

### Rivalry-driven Text Behavior
| Context | Behavior |
|:--|:--|
| **Fight Reports** | Adds rivalry-tagged text (“Old grudges meet again!”) |
| **Newsletters** | Prioritizes storylets featuring known rivalries |
| **Year-in-Review** | Summarizes major rivalries, outcomes, turning points |

Rivalries affect Ink variable weights, narrative intensity, and even small commentary injections from the announcer pool.

---

## ✨ 4. Seasonal Mood System

Every basho month applies a **mood profile** that biases world events:

| Season | System Effects |
|:--|:--|
| **Hatsu** | Morale bonuses; fewer injuries; optimism effects |
| **Haru** | Rivalries form faster; increased audience growth |
| **Natsu** | Stamina penalties; training intensity boost |
| **Nagoya** | Injury risk up; chance of retirement talk |
| **Aki** | Rivalries climax; fame & fan interest spikes |
| **Kyushu** | Cooldown tone; new prospects emerge |

Mood profiles are defined in `/src/data/seasons.json` and referenced by the newsletter and match engine.

---

## 🧠 5. Runtime Flow

At runtime, the system executes as follows:

1. **Determine Current Basho**
   - Map current sim date to seasonal theme (`bashoSeason`).
2. **Select Storylet Pool**
   - Load matching `.ink.json` storylets tagged with that season.
3. **Check for Rivalry Context**
   - If active rivalry detected → increase weight of related storylets.
4. **Assemble Newsletter**
   - Merge Ink sections (header → story → quotes → footer).
5. **Render & Persist**
   - Output to newsletter feed and fight reports.

---

## 🗓️ 6. Implementation Roadmap

| Sprint | Feature | Deliverable |
|:--|:--|:--|
| **K+7** | Seasonal Ink Tags | Adds `seasonTag` logic + data in storylets |
| **K+8** | Rivalry Pack | Dynamic rivalry-based story selection |
| **K+9** | Fight Report Hooks | Live commentary tied to rivalry intensity |
| **T** | Year-in-Review | Seasonal banners, rivalry recaps, recap Ink bundle |

---

## ✅ Summary

> **Seasonal rhythms + rivalries = Basho’s living world.**

This feature set ensures that every basho feels distinct — narratively, visually, and emotionally. Rivalries build over time and resurface naturally within newsletters and fight commentary, turning recurring tournaments into a serialized drama the player shapes season after season.

---
