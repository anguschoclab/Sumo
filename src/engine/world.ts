import { useEffect, useState } from 'react';

export type World = { year: number; month: number; week: number; day: number };

const DEFAULT_WORLD: World = { year: 2025, month: 1, week: 1, day: 1 };

function getGlobal(): any {
  if (typeof window !== 'undefined') return window as any;
  return (globalThis as any);
}

function readWorld(): World {
  const g: any = getGlobal();
  if (!g.__WORLD__) g.__WORLD__ = { ...DEFAULT_WORLD };
  return g.__WORLD__ as World;
}

function notifyWorldChange() {
  const g: any = getGlobal();
  try {
    g.dispatchEvent && g.dispatchEvent(new Event('world:change'));
  } catch {}
  const subs: Set<() => void> = (g.__WORLD_SUBS__ ||= new Set());
  subs.forEach(fn => { try { fn(); } catch {} });
}

function writeWorld(next: World) {
  const g: any = getGlobal();
  g.__WORLD__ = next;
  notifyWorldChange();
}

export function getWorld(): World {
  return readWorld();
}

export function setWorld(next: World) {
  writeWorld(next);
}

export function updateWorld(updater: (w: World) => World) {
  writeWorld(updater(readWorld()));
}

export function subscribeWorld(cb: () => void) {
  const g: any = getGlobal();
  const subs: Set<() => void> = (g.__WORLD_SUBS__ ||= new Set());
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}

/** React hook: returns [world, setWorld, updateWorld] */
export function useWorld(): [World, (next: World) => void, (fn: (w: World) => World) => void] {
  const [w, setLocal] = useState<World>(() => readWorld());

  useEffect(() => {
    const g: any = getGlobal();
    const handler = () => setLocal(readWorld());
    g.addEventListener && g.addEventListener('world:change', handler);
    const unsub = subscribeWorld(handler);
    return () => {
      g.removeEventListener && g.removeEventListener('world:change', handler);
      unsub();
    };
  }, []);

  const set = (next: World) => writeWorld(next);
  const update = (fn: (w: World) => World) => writeWorld(fn(readWorld()));
  return [w, set, update];
}
