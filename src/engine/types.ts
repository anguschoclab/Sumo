export type Division='Makuuchi'|'Juryo'|'Makushita'|'Sandanme'|'Jonidan'|'Jonokuchi'
export type Side='East'|'West'
export type Rank={division:Division,rank:number,side:Side}
export type Title='none'|'ozeki'|'yokozuna'

export type TrainingFocus='power'|'technique'|'balance'|'recovery'
export type TrainingPlan={focus:TrainingFocus,intensity:0|1|2}
export type Injury={type:'knee'|'shoulder'|'back',severity:1|2|3}

export type BashoResult = { bashoId: number, division: Division, wins: number, yusho?: boolean }
export type LineageEdge = { mentorId: string, menteeId: string, sinceWeek: number }

export type Rivalry = {
  aId: string
  bId: string
  heat: number   // 0–100
  meetings: number
  lastWeek: number
}

export type ScoutNote = {
  rikishiId: string
  week: number
  note: string
  confidence: number  // 0..1
  freshness: number   // weeks since observed (0 fresh)
}

export type Rikishi={
  id:string,shikona:string,weightKg:number,heightCm:number,
  style:'oshi'|'yotsu'|'agility'|'grit',hometown:string,rank:Rank,
  title: Title,
  fatigue:number,form:number,injured?:boolean,injury?:Injury,
  kadoban?: boolean, retireWatch?: boolean,
  prestige?: number,
  history?: BashoResult[],
  mentorId?: string,
  menteeIds?: string[]
}

export type Heya={id:string,name:string,hometown:string,risk?:number,rikishi:Rikishi[],training?:TrainingPlan}

export type World={
  heyas:Heya[],
  date:string,
  nextBashoStart:string,
  week:number,
  councilNotes:string[],
  bashoId:number,
  lineage?: LineageEdge[],
  rivalries?: Rivalry[],
  scouting?: ScoutNote[]
}
