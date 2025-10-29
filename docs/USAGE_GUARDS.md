# ALWAYS-PLAYABLE Guards — Usage Guide

This project ships with a small set of defensive helpers so **any full build can boot offline** (Zip-first workflow).

## What’s included
- **Error Boundary** (`src/components/AppErrorBoundary.tsx`): Catches runtime errors and shows a friendly fallback with a “Back to Dashboard” button.
- **Feature Flags** (`src/state/flags.ts`): Central place to toggle dev-only behaviors.
  - `ALWAYS_PLAYABLE` — ensures the app never boots into a blank state.
  - `DEV_AUTO_SEED` — autoloads demo data if storage is empty.
  - `DEV_NEWSLETTER_FORCE` — forces a sample newsletter on load (dev builds only).
- **Demo Seed** (`src/data/seed.ts`): A tiny stable, 4 rikishi, and a stubbed basho calendar for safe first-boot.

## How it works
- On app start, if `ALWAYS_PLAYABLE` is `true` and there’s no save, the app calls `seedDemoSave()` to prepopulate enough data to render all core screens.
- Any unimplemented feature path renders a **friendly “Coming Soon” panel** rather than breaking navigation.
- Buttons are **never dead**: if a feature is gated, the button opens a small modal that explains what’s coming next.

## Dev Tips
- Force a newsletter for visual QA in dev:
  ```js
  localStorage.setItem("DEV_NEWSLETTER_FORCE","1");
  // and refresh the page
  ```
- Clear ONLY the demo seed (keep flags):
  ```js
  localStorage.removeItem("BASHO_SAVE_V1");
  ```
- Reset everything:
  ```js
  localStorage.clear();
  ```

## Troubleshooting
- If you see a blank screen: check the browser console for any import/alias errors and ensure Vite aliases exist in `vite.config.*`.
- If your repo had duplicate files, run the **DeDupe** script again (see below).

## DeDupe (duplicate files) — Quick Run
After applying the delta/hotfix, you can run:
```bash
bash sumo_toolkit/scripts/dedupe-files.sh /path/to/your/project
```
A report is written to `PROJECT/.duplicates/duplicates.csv`, and moved files go under `PROJECT/.duplicates/` (nothing is deleted).