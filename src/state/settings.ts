export type Settings = {
  audio: boolean
  difficulty: 'easy' | 'normal' | 'hard'
}

const DEFAULTS: Settings = {
  audio: true,
  difficulty: 'normal',
}

const KEY = 'sumo.settings.v1'

export function getSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Settings) }
  } catch {}
  return { ...DEFAULTS }
}

export function setSettings(next: Partial<Settings>) {
  const merged = { ...getSettings(), ...next }
  localStorage.setItem(KEY, JSON.stringify(merged))
  return merged
}
