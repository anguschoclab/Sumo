// Central event system + stop helpers
export type EventType =
  | "WEEK_SUMMARY"
  | "BASHO_MONTH_START"
  | "BASHO_DAY1_READY"
  | "TORIKUMI_READY"
  | "INJURY"
  | "SPONSOR_OFFER"
  | "SPECIAL_EVENT";

type Handler = (payload?: any) => void;
const listeners: Record<EventType, Set<Handler>> = {
  WEEK_SUMMARY: new Set(),
  BASHO_MONTH_START: new Set(),
  BASHO_DAY1_READY: new Set(),
  TORIKUMI_READY: new Set(),
  INJURY: new Set(),
  SPONSOR_OFFER: new Set(),
  SPECIAL_EVENT: new Set(),
};

export function on(evt: EventType, fn: Handler) { listeners[evt].add(fn); return () => listeners[evt].delete(fn); }
export function emit(evt: EventType, payload?: any) { for (const fn of listeners[evt]) fn(payload); }

export const STOP_AT = {
  BASHO_DAY1: "BASHO_DAY1",
  TORIKUMI_READY: "TORIKUMI_READY",
  INJURY: "INJURY",
  SPONSOR_OFFER: "SPONSOR_OFFER",
  SPECIAL_EVENT: "SPECIAL_EVENT",
} as const;
export type StopAt = typeof STOP_AT[keyof typeof STOP_AT];
