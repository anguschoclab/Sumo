
export function generatePreBashoBanner(state:any){
  state.ui ??= {}; state.ui.preBashoBanner ??= { active:false, cycleKey: state.calendar?.nextBashoStartISO };
  state.ui.preBashoBanner.active = true;
}
