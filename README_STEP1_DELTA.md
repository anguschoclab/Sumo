# Basho — Step1 Delta (Normalize + DeDupe) — v0.3.4+

This delta normalizes structure, patches Vite aliases, installs boot guards (error boundary, feature flags, seed-on-boot), and moves duplicate files to `./.duplicates` with a CSV report.

## Apply
```bash
./tools/apply-delta.command /path/to/your/project
# then in your project
npm install
npm run dev
```
