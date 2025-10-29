
export function postLedger(world, entry){ world.finances.ledger.push({ ts:Date.now(), ...entry }); world.finances.cash += (entry.delta||0); }
export function addSponsor(world, sponsor){ world.finances.sponsors.push({ ...sponsor, since: world.year }); postLedger(world, { kind:'sponsor', note:`Sponsor: ${sponsor.name}`, delta:sponsor.stipend }); }
