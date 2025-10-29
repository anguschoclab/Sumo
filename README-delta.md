# Basho — v0.3.6 Delta Pack (Auto‑Merge Safe)

This delta is designed to layer **safely** on top of your current game folder without breaking your Vite build.
It ships *side-by-side assets* (JSON, docs, optional delta script) and an **Auto‑Merge** script that copies these into your project.
No existing files are overwritten unless you explicitly confirm.

## Contents
- `delta/v0.3.6.js` — Optional no‑op runtime hook (only runs if you import/attach it).
- `src/data/traits-matrix.schema.json` — Zod-like JSON schema for AI traits & behavior matrix (engine-facing contract).
- `src/data/newsletter.templates.json` — Newsletter & seasonal strings (Ink hooks are referenced but not required).
- `src/data/ftue.config.json` — FTUE defaults (player/heya prompts, tutorial flags).
- `docs/CHANGELOG_v0.3.6.md` — What this delta contains.
- `tools/apply-delta.command` — macOS one‑click auto‑merge (asks before overwriting anything).
- `tools/verify-preflight.command` — Quick checks (node, npm, vite, alias sanity).

## Quick Start (macOS)
1) **Back up** your current game folder.
2) Drop the contents of this zip at the root of your game (same level as `index.html` or `vite.config.ts`).
3) Double‑click **`tools/apply-delta.command`**.
   - It will copy new files into place (never overwriting without confirmation).
4) Run your project:
   ```bash
   npm i
   npm run dev
   ```

### Optional: attach the delta script
If you want a visible confirmation at runtime, add **once** to `index.html`:
```html
<script type="module" src="/delta/v0.3.6.js"></script>
```
(or import it from your main entry). The script is a no‑op except for a console banner.

---

## What this delta **does not** do
- It does **not** modify existing TS/TSX files.
- It does **not** change your build config.
- It does **not** include the full design‑bible (to keep this tiny and safe).

If you'd like, I can ship a separate **Docs delta** that only adds/updates `docs/Design_Bible.md` and related specs.

— End.
