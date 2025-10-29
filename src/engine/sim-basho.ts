import { getWorld } from "./store";
import { state as basho, isBashoMonth, nextBashoMonth, startBashoIfNeeded } from "./basho";
import { skipping, stopAtMonthDay1Target, stopIfReached } from "./skip";

export function isBashoActive(): boolean {
  const w = getWorld();
  return isBashoMonth(w.month);
}

export function progressBashoIfNeeded() {
  // Called after each time advance; let skip system decide whether to pause.
  if (skipping.target) {
    stopIfReached();
  }
  // start basho day 1 when entering a basho month
  startBashoIfNeeded();
}