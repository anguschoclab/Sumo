
import { bootstrap, persist } from './world.js';
import { seedWorld } from './seed.js';
import { toDateString } from './time.js';
import { scheduleFor } from './basho.js';
import { stepDay, stepWeek, jumpToNextBasho } from './skip.js';
import { save, clear as clearSave } from './storage.js';
import { openFTUEModal } from './ftue.js';

function el(tag, attrs={}, ...children){
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if (k==='class') node.className=v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k,v);
  });
  for (const c of children){ if(c==null)continue; if(typeof c==='string') node.appendChild(document.createTextNode(c)); else node.appendChild(c); }
  return node;
}
function safe(renderFn, msg='Something went wrong.') {
  try { return renderFn(); } catch(e){ console.error('[ErrorBoundary]', e); return el('div',{class:'card'}, el('h3',{},'Oops!'), el('p',{},msg), el('div',{}, el('a',{href:'#', onClick:(e)=>{e.preventDefault(); location.reload();}}, 'Back to Dashboard'))); }
}
export function boot(root){
  const state = { world: bootstrap(seedWorld), tab:'Dashboard', modal:null };
  if (!state.world.player || !state.world.player.name || !state.world.player.heya) {
    state.world.player = state.world.player || {}; state.world.player.name = state.world.player.name || 'Manager'; state.world.player.heya = state.world.player.heya || 'Shioyama-beya'; persist(state.world); openFTUEModal(state, render);
  }
  function render(){
    root.innerHTML='';
    root.appendChild(el('div',{},
      header(), tabs(), safe(()=>body()), footer()
    ));
    if (state.modal){
      const overlay = el('div',{class:'modal-backdrop', onClick:(e)=>{ if(e.target===overlay){ state.modal=null; render(); } }});
      const box = el('div',{class:'modal'}, el('h3',{}, state.modal.title||'Modal'),
        el('div',{id:'modal-body'}),
        el('div',{style:'display:flex; gap:8px; justify-content:flex-end; margin-top:12px;'},
          ...(state.modal.actions||[{label:'Close', onClick:()=>{state.modal=null; render();}}]).map(a=>el('button',{class:'btn', onClick:a.onClick}, a.label))
        )
      );
      overlay.appendChild(box); root.appendChild(overlay);
      if (typeof state.modal.body==='function'){ state.modal.body(box.querySelector('#modal-body')); }
    }
  }
  function header(){
    return el('div',{class:'hdr'},
      el('div',{}, el('div',{class:'brand'},'Sumo — Baseline (A–K)'), el('div',{class:'badge'}, toDateString(state.world))),
      el('div',{class:'btns'},
        el('button',{class:'btn', onClick:()=>{ stepDay(state.world); render(); }}, '+ Day'),
        el('button',{class:'btn', onClick:()=>{ stepWeek(state.world); render(); }}, '+ Week'),
        el('button',{class:'btn', onClick:()=>{ jumpToNextBasho(state.world); render(); }}, '⏭ Next Basho'),
        el('button',{class:'btn', onClick:()=>{ save(state.world); alert('Saved.'); }}, '💾 Save'),
        el('button',{class:'btn', onClick:()=>{ clearSave(); location.reload(); }}, '🗑️ Reset')
      )
    );
  }
  function tabs(){
    const items = ['Dashboard','Roster','Tournaments','Economy','Rivalries','Settings'];
    return el('div',{class:'tabbar'}, ...items.map(name=> el('div',{class:'tab'+(state.tab===name?' active':''), onClick:()=>{state.tab=name; render();}}, name)));
  }
  function body(){
    if (state.tab==='Dashboard') return dashboardCard();
    if (state.tab==='Roster') return rosterCard();
    if (state.tab==='Tournaments') return tournamentsCard();
    if (state.tab==='Economy') return economyCard();
    if (state.tab==='Rivalries') return rivalriesCard();
    if (state.tab==='Settings') return settingsCard();
    return el('div',{class:'card'},'Unknown tab');
  }
  function dashboardCard(){
    const w = state.world;
    return el('div',{class:'row'},
      el('div',{class:'col'}, el('div',{class:'card'},
        el('h3',{}, `Hello ${w.player.name} of ${w.player.heya}`),
        el('div',{class:'kv'},
          el('div',{},'Date'), el('div',{}, toDateString(w)),
          el('div',{},'Cash'), el('div',{}, `$${(w.finances.cash).toLocaleString()}`),
          el('div',{},'Rikishi'), el('div',{}, String(w.rikishi.length)),
        ),
        el('div',{class:'btns', style:'margin-top:10px;'},
          el('button',{class:'btn', onClick:()=>{ state.tab='Tournaments'; render(); }}, 'Open Tournaments'),
          el('button',{class:'btn', onClick:()=>{ state.tab='Roster'; render(); }}, 'View Roster')
        )
      )),
      el('div',{class:'col'}, el('div',{class:'card'},
        el('h3',{},'News'),
        el('table',{class:'table'},
          el('thead',{}, el('tr',{}, el('th',{},'When'), el('th',{},'Item'))),
          el('tbody',{},
            ...(w.events.slice(-6).reverse()).map(e=> el('tr',{}, el('td',{}, new Date(e.ts).toLocaleString()), el('td',{}, e.text||e.kind)))
          )
        )
      ))
    );
  }
  function rosterCard(){
    const rows = state.world.rikishi.slice(0,20);
    return el('div',{class:'card'},
      el('h3',{},'Rikishi'),
      el('table',{class:'table'},
        el('thead',{}, el('tr',{}, el('th',{},'Shikona'), el('th',{},'Heya'), el('th',{},'Rank'), el('th',{},'Power'), el('th',{},'Speed'), el('th',{},'Technique'), el('th',{},'Form'))),
        el('tbody',{}, ...rows.map(r=> el('tr',{}, el('td',{},r.shikona), el('td',{},r.heya), el('td',{},r.rank), el('td',{},r.power), el('td',{},r.speed), el('td',{},r.technique), el('td',{},r.form))))
      )
    );
  }
  function tournamentsCard(){
    const w = state.world;
    const sched = scheduleFor(w);
    return el('div',{class:'card'},
      el('h3',{},`Today's Bouts`),
      sched.length ? el('table',{class:'table'},
        el('thead',{}, el('tr',{}, el('th',{},'#'), el('th',{},'East'), el('th',{},'West'), el('th',{},'Dohyo'))),
        el('tbody',{}, ...sched.map((b,i)=> el('tr',{}, el('td',{}, String(i+1)), el('td',{},b.east), el('td',{},b.west), el('td',{},b.dohyo)))))
      : el('div',{},'No tournament today. Use ⏭ Next Basho.')
    );
  }
  function economyCard(){
    const w = state.world;
    return el('div',{class:'row'},
      el('div',{class:'col'}, el('div',{class:'card'},
        el('h3',{},'Sponsors'),
        el('div',{}, ...(w.finances.sponsors.map(s=> el('div',{}, `${s.name} — $${s.stipend}/mo`)))),
        el('div',{class:'btns', style:'marginTop:10px'},
          el('button',{class:'btn', onClick:()=>{ w.finances.sponsors.push({name:'Natto Labs', stipend:12000, since:w.year}); w.finances.cash+=12000; persist(w); render(); }}, 'Add Sponsor (Mock)')
        )
      )),
      el('div',{class:'col'}, el('div',{class:'card'},
        el('h3',{},'Ledger'),
        el('table',{class:'table'},
          el('thead',{}, el('tr',{}, el('th',{},'When'), el('th',{},'Note'), el('th',{},'Δ'))),
          el('tbody',{}, ...w.finances.ledger.slice(-12).reverse().map(e=> el('tr',{}, el('td',{}, new Date(e.ts).toLocaleString()), el('td',{}, e.note||e.kind||'entry'), el('td',{}, (e.delta>0?'+':'')+(e.delta||0)))))
        )
      ))
    );
  }
  function rivalriesCard(){
    const w = state.world;
    return el('div',{class:'card'},
      el('h3',{},'Rivalries & Scouting'),
      el('p',{},'Lightweight demo view. Rivalry escalation/decay will appear here.'),
      el('div',{}, ...(w.rivalries.slice(0,10).map(r=> el('div',{}, `${r.a} vs ${r.b} — heat:${r.heat}`)))),
      el('div',{class:'btns'},
        el('button',{class:'btn', onClick:()=>{ w.rivalries.push({ a:'Asaryu', b:'Hakuyama', heat:Math.floor(Math.random()*100) }); persist(w); render(); }}, 'Add Rivalry (Mock)')
      )
    );
  }
  function settingsCard(){
    const w = state.world;
    return el('div',{class:'card'},
      el('h3',{},'Settings'),
      el('div',{class:'kv'},
        el('div',{},'Player'), el('div',{}, w.player.name),
        el('div',{},'Heya'), el('div',{}, w.player.heya),
        el('div',{},'Save Slots'), el('div',{}, 'localStorage')
      ),
      el('div',{class:'btns', style:'margin-top:10px;'},
        el('button',{class:'btn', onClick:()=>{ openFTUEModal(state, render); }}, 'Edit Player/Heya'),
        el('button',{class:'btn', onClick:()=>{ save(w); alert('Saved.'); }}, 'Save Now'),
        el('button',{class:'btn', onClick:()=>{ clearSave(); location.reload(); }}, 'Reset Game')
      )
    );
  }
  function footer(){ return el('div',{class:'footer'}, 'Always Playable • A–K Baseline'); }
  render();
}
