export type Division = 'Makuuchi'|'Juryo'|'Makushita'|'Sandanme'|'Jonidan'|'Jonokuchi'
export type Rank = 'Yokozuna'|'Ozeki'|'Sekiwake'|'Komusubi'|`Maegashira ${number}`|`Juryo ${number}`|`Makushita ${number}`|`Sandanme ${number}`|`Jonidan ${number}`|`Jonokuchi ${number}`
export type Side = 'East'|'West'

export interface RecordLine { wins:number; losses:number; draws?:number }
export interface BoutLog { day:number; vsId:string; kimarite?:string; nonTechnique?:string }

export interface Rikishi {
  id:string
  shikona:string
  heya:string
  division:Division
  rank:Rank
  side:Side
  hometown:string
  flags:string[]
  heightCm:number
  weightKg:number
  reachCm:number
  style:{ oshizumo:number; yotsuzumo:number; agility:number; grit:number }
  favoredKimarite:string[]
  fatigue:number
  morale:number
  injury:{ status:'healthy'|'knock'|'injured'|'kyujo'; knee:number }
  record:{ career:RecordLine & { yusho:number; kachiKoshi:number; makeKoshi:number }; basho: Record<string, RecordLine & { log:BoutLog[] }> }
  lastBout?: { winnerId:string; loserId:string; kimarite?:string; aftermath:string }
}

export interface Universe {
  seed:number
  day:number
  rikishi:Rikishi[]
}
