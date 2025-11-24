# Validation Report: Sumo Game Codebase

**Date:** 2025-10-27
**Auditor:** Jules (AI Agent)
**Reference Documentation:** `Basho_Design_Bible_and_Delivery_Roadmap_v0.2.md` (Target: Sprint K2/K3)

---

## 1. Executive Summary

**Status: CRITICAL DISCREPANCY**

The codebase currently represents a **Sprint A/B (UI Shell + Stub)** state, whereas the documentation (`Basho_Design_Bible_and_Delivery_Roadmap_v0.2.md`) claims the project is at **Sprint K+ (Advanced Beta)**.

While the application meets the "Always-Playable" technical requirement (it boots, renders, and doesn't crash), it is effectively a **Potemkin Village**. The "Engine" layer—simulation, matchmaking, economy, and narrative—is almost entirely missing or mocked with static data.

| Component | Status | Discrepancy Level |
| :--- | :--- | :--- |
| **UI / Shell** | ✅ Present | Low (Matches "Always-Playable" spec) |
| **Simulation Engine** | ❌ Missing / Stubbed | **Critical** (Docs claim complete) |
| **Economy** | ❌ Missing | **Critical** (Docs claim complete) |
| **Narrative (Ink)** | ❌ Missing | **Critical** (Docs claim complete) |
| **Tech Stack** | ⚠️ Deviant | High (Missing key libs) |

---

## 2. Roadmap Verification (Sprint K Checklist)

The following table compares the **documented status** against the **actual code reality**:

| Feature Area | Doc Status (Sprint K) | Actual Code Status | Notes |
| :--- | :--- | :--- | :--- |
| **Basho Core** | ✅ Complete | ❌ **Stubbed** | `basho.ts` has only date utilities. No scheduling, no banzuke logic. |
| **Torikumi (Matches)** | ✅ Complete | ❌ **Hardcoded** | `App.tsx` uses a static array for matches. `match.ts` has a primitive random number generator. |
| **Standings** | ✅ Complete | ❌ **Hardcoded** | `BashoStandings.tsx` renders a hardcoded array from `App.tsx`. |
| **Economy** | ✅ Complete | ❌ **Empty** | `economy.ts` contains a single no-op function: `applyDailyUpkeep() {}`. |
| **Event Feed** | ✅ Complete | ⚠️ **Partial** | Basic time tick exists (`time.ts`), but no complex event generation. |
| **Narrative System** | ✅ Complete | ❌ **Missing** | No `inkjs` dependency. No storylet files found. |

---

## 3. Architecture & Tech Stack Audit

The Design Bible specifies a robust stack for a complex simulation. The current project is a minimal React shell.

### Missing Dependencies
The following critical libraries listed in the **Design Bible** are **absent** from `package.json`:
*   `zustand` & `immer` (State Management)
*   `dexie` (Persistence/IndexedDB)
*   `inkjs` (Narrative Engine)
*   `seedrandom` (Deterministic RNG)
*   `zod` (Validation)
*   `howler` (Audio)
*   `framer-motion` (Animations)

**Current Stack:**
*   `react`, `react-dom`
*   `vite`
*   `typescript`
*   *(No state management lib, using raw `useState` + `CustomEvent`)*

### Architectural Deviations
*   **State Management:** Instead of a centralized store (Zustand/Redux), the app uses scattered `useState` hooks and a simple event emitter (`time.ts`).
*   **Persistence:** No IndexedDB implementation. Only a simple `localStorage` call for the user profile.
*   **Engine Separation:** While the `src/engine` folder exists, it does not contain the isolated, testable logic described in the modularization plans.

---

## 4. "Always-Playable" Compliance

The project **PASSES** the specific "Always-Playable" requirements, which is likely why it appears functional at a glance.

*   ✅ **Boot Guarantee:** `index.html` loads standalone without build errors.
*   ✅ **Seeded Demo Data:** `App.tsx` injects hardcoded "demo" data if no state exists.
*   ✅ **Safe UI:** Buttons and navigations work (or are disabled) without crashing the app.
*   ✅ **Offline Ready:** It is a static client-side app.

**Observation:** The "Always-Playable" directive has been interpreted as "Make sure the UI always renders *something*," rather than "Ensure the *simulation* is playable at any state."

---

## 5. Recommendations

1.  **Reset Roadmap Status:** Downgrade the project status in documentation from **Sprint K** to **Sprint B (revisited)**.
2.  **Install Core Dependencies:** Immediately add `zustand`, `dexie`, and `seedrandom` to begin building the actual simulation engine.
3.  **Implement Engine Basics:**
    *   Replace `match.ts` stubs with a real attribute-based resolver.
    *   Replace `basho.ts` stubs with a schedule generator.
    *   Replace `App.tsx` hardcoded arrays with data fetched from the `engine`.
4.  **Integrate Economy:** Implement the missing `economy.ts` logic.

---
*End of Report*
