
export const sclone = <T,>(x:T):T => (typeof structuredClone==='function' ? structuredClone(x) : JSON.parse(JSON.stringify(x)));
