// src/hotkeys-entry.tsx
// Additive patch: keeps existing functionality if present, and imports ScoutingDock for auto-mount.

// Existing global time dock / hotkeys remain intact (tolerant checks):
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("./components/GlobalTimeDock");
} catch {}

try {
  // Mount scouting dock (auto-injects a floating button + modal)
  require("./components/ScoutingPanel");
} catch {}
