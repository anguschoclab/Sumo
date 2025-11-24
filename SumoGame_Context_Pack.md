# 🏯 SumoGame Project Context Pack (v0.26.2)

This document transfers the full project context into a new, file‑enabled chat so we can continue shipping ZIP builds per sprint.

---

## 🎯 Vision
**SumoGame** (code name **“Basho”**) is a single‑player **sumo stable management** sim. You are an **oyakata** running a **heya**, training and managing **rikishi** through **four honbasho per year**, competing with AI‑run stables across all professional divisions. Outcomes use authentic **kimarite** (82 techniques). World evolves across eras with emergent stories, rivalries, lineages, and governance (JSA, Yokozuna Council).

---

## 🧩 Core Gameplay Pillars
- **Authenticity**: banzuke (East/West), promotion/relegation across **Makuuchi → Jonokuchi**; sanshō/yūshō; kadoban and yokozuna expectations.
- **Depth**: training plans (power/balance/technique/recovery), fatigue, injuries (e.g., heavy‑weight knee risk), form streaks, comebacks.
- **Bout Engine**: weight/height/reach + styles (oshi/yotsu/agility/grit), favored kimarite bias, realistic technique distributions by division/era.
- **World Systems**: rivalries (rikishi + heya), scouting fog‑of‑war, AI personalities (owners/coaches/rikishi), shikona/lineage/mentorship.
- **Narrative**: pre‑basho previews, post‑basho reviews, scandals, meteoric rises, “seat cushion” upsets.
- **Economy (later)**: sponsorships, heya expenses, recruitment with foreigner quota (1 active non‑citizen per heya; 5‑year citizenship timer).

---

## 🛠 Technical Stack
- **React + TypeScript** (Node **24.9.0**)
- **TailwindCSS + Radix UI** (dialogs/tabs/toasts/menus), sumo‑flavored theme
- **Redux** store (moving to RTK/types as we modularize)
- **PWA** (planned): manifest, icons, install prompt
- **No deployed build yet** — we ship code ZIPs only

---

## 📦 Delivery Protocol (ZIP‑first)
- Milestones (**A, D, G, K, J**) ship **full ZIPs** with complete source.
- In‑between sprints ship **delta ZIPs** (only changed files) + a tiny apply script (verifies version, backs up, applies).
- Always include `CHANGELOG.md`, `SHA256SUMS.txt`, `SMOKE.md`.
- Local run: `npm install && npm run dev`.

---

## 🧭 Sprint Roadmap (Revised & Ordered)
**A. Core Framework (FULL ZIP)**  
- Start → New World (≈45 heyas, 15–30 rikishi ea.)  
- East/West banzuke render, all divisions present  
- 82‑technique kimarite registry (single source)  
- Bout engine (size/skill/reach/style), weekly time advance, pre‑basho banner  
- Base UI (Start, Dashboard, People, Banzuke, News)

**B. Training & Development (DELTA)**  
- Training plans: power, technique, balance, recovery (+ intensity)  
- Youth/academy intake (shin‑deshi → Jonokuchi)  
- Fatigue/form systems; injuries (heavy‑weight knee risk); morale flavor

**C. Narrative & World Events (DELTA)**  
- Pre‑basho previews (promotion/demotion watch, ozeki pressure)  
- Post‑basho reviews (over/under‑achievers)  
- “Bout of the Basho” badge; seat‑cushion upset flavor

**D. Governance & Prestige (FULL ZIP)**  
- **JSA & Yokozuna Council** layers (advisory + deliberation events)  
- **Promotion**: Ōzeki → Yokozuna (“two yūshō or yūshō + 14+”), quality‑of‑opposition nuance  
- Kadoban; Yokozuna retirement pressure checks  
- Multiple Yokozuna ordering on banzuke; **Yokozuna Watch** badge/UI

**E. Shikona & Lineage (DELTA)**  
- Realistic shikona generation (mentor/kanji motifs; family/mentor inheritance)  
- Mentorship transfer; lineage graph; lineage achievements

**F. Rivalries & Scouting (DELTA)**  
- Rivalry heat scoring; heya rivalries  
- Scouting tiers + fog‑of‑war (Option 1 lower divisions/juniors/foreign; Option 2 others)  
- Scout reports: kimarite profiles, H2H tables, dark‑horse flags

**G. UI/UX Polish I (FULL ZIP)**  
- Global Tailwind + Radix polish; icons; transitions; dohyō/keshō visuals  
- Windowed lists; tooltips/glossary; banzuke details (hometown, side, rank)

**H. Post‑Basho Analytics (DELTA)**  
- Kimarite histograms (per division) + compare toggle  
- Coach/scout insight generation off analytics

**I. FTUE & Stable Setup (DELTA)**  
- Multi‑step start: player name + heya name (custom + random list)  
- Oyakata identity generator; philosophy traits (apply to AI heyas)  
- Starting training focus options (more variety)

**J. Save System & Persistence (FULL ZIP)**  
- Named saves; quicksave/quickload; delete; save‑slot UI  

**K. Aesthetic Pass & PWA (FULL ZIP)**  
- Manifest/icons; install prompt; themed CSS pass for sharable screenshots

---

## ✅ Implemented to Date (Sprint A baseline)
- Start screen → **New Game** working (world gen seeded)  
- **World**: ~42–48 heyas; 15–30 rikishi each; divisions populated  
- **Banzuke**: East/West tables per division; shows shikona, rank, hometown  
- **Bout Engine**: calibrated sweet‑spot 150–237 kg; reach/style/fatigue/injury influence; technique sampling from **kimarite82**  
- **Pre‑basho** banner auto‑appears ≈ 1 week prior  
- **UI**: Tailwind + Radix design system (cards/buttons/modals/tabs)  
- **Routing**: Start, Dashboard, People, Banzuke, News

---

## 📋 Backlog by Priority
**P0**  
- Keep **single source of truth** for engine/types/save (remove duplicates)  
- Time passage: weekly between basho, daily during basho (15 days)  
- Banzuke rebuild after basho; track yūshō, kachi/make‑koshi  
- Save/Load manager (named saves, quick slots)  
- Foreign‑born quota (1/heya) + 5‑year citizenship; dual flags

**P1**  
- Rivalries (rikishi/heya) + UI modal; scouting + fog‑of‑war  
- Shikona generator + lineage graph & achievements  
- JSA/Council + Yokozuna Watch & deliberation flow  
- Pre/Post‑basho news flavor; ozeki pressure stories

**P2**  
- Post‑basho technique histograms + compare toggle + insights  
- Coach advice panel (bout prep, weight strategy)  
- PWA & install button; icons; “Install App” CTA  

---

## 🎨 UX / Visual Language
- Tailwind tokens: indigo night, gold keshō, rope/dohyō accents  
- Radix dialogs for key flows (bouts, saves, analytics)  
- Banners for **Pre‑Basho Preview** and **Post‑Basho Review**  
- Mawashi color themes (superstition swaps), keshō‑mawashi badges

---

## 🧹 Code Quality Principles
- Type world state; avoid `any`; prefer RTK immutability (structuredClone fallback ok)  
- Remove duplicates (e.g., **kimariteSimple**); centralize imports via engine barrel  
- Memoize selectors; window long lists; avoid re‑renders  
- Consistent filenames; one responsibility per module

---

## 🚀 How to Use This File in New Chat
Upload this file there and say:  
“**Here’s the SumoGame Context Pack. Our baseline is v0.26.0_full; please package Sprint A as a full ZIP (v0.26.2_parity_full).**”

The assistant in that environment can then build and attach the ZIP directly.
