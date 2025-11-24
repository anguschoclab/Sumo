// src/engine/recruitment.ts
// Thin wrapper that integrates with time progression; safe to call weekly.

import { weeklyGenerateProspects } from "./scouting";

export function onWeekRollover(){
  try { weeklyGenerateProspects(); } catch(e){ /* no-op */ }
}
