type W = { week:number; day:number };
const getW = (): W => ((window as any).__WORLD__ ||= { week:1, day:1 });
const setHUD = () => {
  const w = getW();
  let el = document.getElementById("worldHud");
  if (!el) {
    el = document.createElement("div");
    el.id = "worldHud";
    Object.assign(el.style, {
      position:"fixed", right:"10px", bottom:"10px", zIndex:"9999",
      padding:"6px 10px", borderRadius:"6px",
      background:"#111", color:"#fff", font:"12px/1.2 -apple-system,system-ui,Segoe UI,Roboto",
      border:"1px solid #333", opacity:"0.9"
    });
    document.body.appendChild(el);
  }
  el.textContent = `Week ${w.week}, Day ${w.day}`;
};
window.addEventListener("world:updated", () => {
  const w = getW();
  console.log("[wiretap] world:updated → week/day:", w.week, w.day);
  setHUD();
});
document.addEventListener("DOMContentLoaded", setHUD);
setHUD();
