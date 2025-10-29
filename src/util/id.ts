
let _ctr = 0;
export const uid = (p='id') => `${p}_${Date.now().toString(36)}_${(_ctr++).toString(36)}`;
