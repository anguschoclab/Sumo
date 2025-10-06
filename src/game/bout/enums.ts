
export const KIMARITE = Object.freeze({
  yorikiri:'yorikiri', oshidashi:'oshidashi', uwatenage:'uwatenage',
  // ... (rest of 82 techniques would be listed here in full implementation)
});
export const NON_TECH = Object.freeze({ fusensho:'fusensho', hansoku:'hansoku', kettei:'kettei' });
export type Kimarite = keyof typeof KIMARITE;
export type NonTech = keyof typeof NON_TECH;
export const asKimarite = (s?:string)=> (s && (KIMARITE as any)[s]) ? s as Kimarite : undefined;
export const asNonTech = (s?:string)=> (s && (NON_TECH as any)[s]) ? s as NonTech : undefined;
