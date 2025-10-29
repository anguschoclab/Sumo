export const flags = {
  ALWAYS_PLAYABLE: true,
  NEWSLETTER_ENABLED: true,
  SEED_ON_BOOT: true,
  DEBUG_STANDINGS: false,
};
export function isEnabled(key: keyof typeof flags) { return Boolean(flags[key]); }
