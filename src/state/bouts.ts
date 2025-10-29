export type BoutResult = {
  id: string;
  east: string;
  west: string;
  winner?: "east" | "west";
  kimariteId?: string;
};

const KEY = "sumo.bouts.v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

let cache: Record<string, BoutResult> = load();

function save() {
  localStorage.setItem(KEY, JSON.stringify(cache));
}

export function getBout(id: string): BoutResult | undefined {
  return cache[id];
}

export function setBout(result: BoutResult) {
  cache[result.id] = result;
  save();
  window.dispatchEvent(new CustomEvent("bouts:updated", { detail: result }));
}

export function listBouts(): BoutResult[] {
  return Object.values(cache);
}

export function clearBouts() {
  cache = {};
  save();
}
