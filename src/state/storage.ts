const KEY = 'sumo:seed:v1'

export function ensureSeed(seedFn: () => any) {
  if (!localStorage.getItem(KEY)) {
    const data = seedFn()
    localStorage.setItem(KEY, JSON.stringify(data))
  }
}

export function loadSeed() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch(e) { return null }
}