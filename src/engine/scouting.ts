// src/engine/scouting.ts
// Minimal scouting system: weekly prospect generation, grades, persistence.
// Non-breaking: stores data on world.scouting.*

export type Handedness = "migi" | "hidari" | "ambidextrous"; // right / left
export type Style = "yotsu" | "oshi" | "agility" | "grit";
export type BodyType = "power" | "speed" | "balanced";
export type GripPref = "migi-yotsu" | "hidari-yotsu" | "otsuke" | "morozashi" | "unknown";

export interface Prospect {
  id: string;
  name: string;
  origin: string;
  heightCm: number;
  weightKg: number;
  style: Style;
  handedness: Handedness;
  body: BodyType;
  grip: GripPref;
  traits: string[];         // lightly revealed
  grade: "A"|"B"|"C"|"D"|"E";
  gradeVar: number;         // uncertainty 0..1 (shrinks with scouting)
  scouted: number;          // times scouted
  interest: number;         // 0..100 willingness to sign
  expiresInWeeks: number;   // will roll off if > 0 and decremented weekly
}

type World = any;
declare global {
  interface Window { __WORLD__?: any; }
}

function w(): World {
  // tolerant getter for the user's existing store accessor
  const anyWin = window as any;
  if (typeof anyWin.getWorld === "function") return anyWin.getWorld();
  return anyWin.__WORLD__ ||= {};
}

function s(newWorld: World) {
  const anyWin = window as any;
  if (typeof anyWin.setWorld === "function") return anyWin.setWorld(newWorld);
  anyWin.__WORLD__ = newWorld;
}

function rngInt(min:number, max:number){ return Math.floor(Math.random()*(max-min+1))+min; }
function choice<T>(arr:T[]):T{ return arr[rngInt(0, arr.length-1)]; }

const ORIGINS = ["Hokkaido","Aomori","Tokyo","Osaka","Fukuoka","Mongolia","Georgia","Ukraine","Brazil","USA","Bulgaria","Kazakhstan","China","Korea"];
const GIVEN = ["Kenta","Daiki","Ryu","Haruto","Sora","Taiga","Kaito","Yuto","Ren","Shotaro","Itsuki","Naoki","Hayato","Yuji"];
const FAM = ["Kawa","Sato","Yama","Umi","Kaze","Fuji"];
const STYLES: Style[] = ["yotsu","oshi","agility","grit"];
const BODIES: BodyType[] = ["power","speed","balanced"];
const HAND: Handedness[] = ["migi","hidari","ambidextrous"];
const GRIPS: GripPref[] = ["migi-yotsu","hidari-yotsu","morozashi","otsuke","unknown"];
const TRAITS = ["workhorse","explosive","crafty","clinic footwork","tenacious","cold starter","comeback kid"];

function makeName(){
  const g = choice(GIVEN);
  const f = choice(FAM);
  // simple mash to avoid exact duplicates
  return (g + f).replace(/([a-z])([A-Z])/g,"$1 $2");
}

function initialGrade(weightKg:number, heightCm:number, style:Style): "A"|"B"|"C"|"D"|"E" {
  let score = 0;
  // very rough: heavier + taller drift higher; agility style offsets weight bias slightly
  score += Math.min(20, Math.max(0, (weightKg-140)/5));
  score += Math.min(20, Math.max(0, (heightCm-175)/2));
  if (style === "agility") score += 5;
  if (style === "grit") score += 3;
  const bucket = score >= 30 ? "A" : score >= 22 ? "B" : score >= 15 ? "C" : score >= 8 ? "D" : "E";
  return bucket as any;
}

export function ensureScouting() {
  const world = w();
  world.scouting ||= {};
  world.scouting.pool ||= [] as Prospect[];
  world.scouting.visits ||= {}; // id -> bool
  world.scouting.offers ||= {}; // id -> offered amount
  s(world);
  return world;
}

export function weeklyGenerateProspects(nowWeek?: number){
  const world = ensureScouting();
  const pool: Prospect[] = world.scouting.pool;
  // age out
  for (const p of pool) p.expiresInWeeks = Math.max(0, (p.expiresInWeeks ?? rngInt(3,8)) - 1);
  const keep = pool.filter(p => p.expiresInWeeks > 0);
  world.scouting.pool = keep;
  // generate 4–7 new
  const n = rngInt(4,7);
  for (let i=0;i<n;i++){
    const height = rngInt(172,200);
    const weight = rngInt(140,250);
    const style = choice(STYLES);
    const p: Prospect = {
      id: "pros_"+ Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,7),
      name: makeName(),
      origin: choice(ORIGINS),
      heightCm: height,
      weightKg: weight,
      style,
      handedness: choice(HAND),
      body: choice(BODIES),
      grip: choice(GRIPS),
      traits: [choice(TRAITS)],
      grade: initialGrade(weight, height, style),
      gradeVar: 0.35,
      scouted: 0,
      interest: rngInt(40,75),
      expiresInWeeks: rngInt(4,8)
    };
    world.scouting.pool.push(p);
  }
  s(world);
  return world.scouting.pool;
}

export function listProspects(): Prospect[] {
  const world = ensureScouting();
  return world.scouting.pool as Prospect[];
}

export function scoutMore(id:string){
  const world = ensureScouting();
  const p: Prospect | undefined = (world.scouting.pool as Prospect[]).find((x:Prospect)=>x.id===id);
  if (!p) return;
  p.scouted += 1;
  p.gradeVar = Math.max(0, p.gradeVar - 0.08); // tighten uncertainty
  p.traits = Array.from(new Set([...(p.traits||[]), choice(TRAITS)]));
  s(world);
}

export function inviteVisit(id:string){
  const world = ensureScouting();
  world.scouting.visits ||= {};
  world.scouting.visits[id] = true;
  s(world);
}

export function offerToJoin(id:string, stipend:number){
  const world = ensureScouting();
  world.scouting.offers ||= {};
  world.scouting.offers[id] = stipend;
  // naive accept chance
  const p: Prospect | undefined = (world.scouting.pool as Prospect[]).find((x:Prospect)=>x.id===id);
  if (p){
    const acceptChance = Math.min(95, Math.max(5, p.interest + (stipend>0?10:0) - p.scouted*2));
    const roll = Math.random()*100;
    if (roll < acceptChance){
      // add to roster: naive append
      world.people ||= [];
      world.people.push({
        id: "rk_"+ Math.random().toString(36).slice(2,9),
        name: p.name,
        origin: p.origin,
        heightCm: p.heightCm,
        weightKg: p.weightKg,
        style: p.style,
        grip: p.grip,
        handedness: p.handedness,
        traits: p.traits,
        fatigue: 0, form: 0
      });
      world.scouting.pool = (world.scouting.pool as Prospect[]).filter((x:Prospect)=>x.id!==id);
    }
  }
  s(world);
}
