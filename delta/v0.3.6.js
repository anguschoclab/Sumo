// Basho v0.3.6 delta hook — safe no‑op unless imported.
// Purpose: visible confirmation in console, future bridge point.
(() => {
  const banner = [
    '%cBasho v0.3.6 Delta Attached',
    'font-weight:bold;padding:2px 6px;border-radius:4px;background:#111;color:#6cf'
  ];
  try {
    console.log(...banner);
  } catch {}
})();
