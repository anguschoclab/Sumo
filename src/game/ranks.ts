
export const normDivision = (s:string='') => s.normalize('NFKD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace('jūryō','juryo');
