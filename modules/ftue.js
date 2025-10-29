
import { persist } from './world.js';
import { postLedger, addSponsor } from './economy.js';
export function runFTUE(world){ if(!world.finances.sponsors.length){ addSponsor(world, { name:'Yokozuna Cola', stipend:25000 }); } if(world.finances.ledger.length===0){ postLedger(world, { kind:'seed', note:'Initial funding', delta:150000 }); } persist(world); }
export function openFTUEModal(state, render){
  state.modal = {
    title: 'Welcome to Sumo Management',
    body: (container) => {
      const el = document.createElement('div');
      el.innerHTML = `
        <div style="display:grid; gap:10px;">
          <label>Player Name <input id="ftue-player" class="input" value="${state.world.player.name||''}" placeholder="Your name"/></label>
          <label>Heya Name <input id="ftue-heya" class="input" value="${state.world.player.heya||''}" placeholder="e.g. Shioyama-beya"/></label>
          <div class="tooltip">You can change these later in Settings.</div>
        </div>`;
      container.appendChild(el);
    },
    actions: [{ label:'Start', primary:true, onClick:()=>{
      const p = document.getElementById('ftue-player').value.trim() || 'Manager';
      const h = document.getElementById('ftue-heya').value.trim() || 'Shioyama-beya';
      state.world.player.name = p; state.world.player.heya = h; runFTUE(state.world); state.modal=null; render();
    }}]
  };
  render();
}
