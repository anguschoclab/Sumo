
let deferred: any = null;
let listeners: Array<(e:any)=>void> = [];
export function setupInstallPrompt(){
  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    deferred = e;
    listeners.forEach((fn)=> fn(deferred));
  });
}
export function onInstallAvailable(cb:(e:any)=>void){
  listeners.push(cb);
  if (deferred) cb(deferred);
  return () => { listeners = listeners.filter((x)=> x!==cb); };
}
export async function triggerInstall(){
  if (!deferred) return false;
  deferred.prompt();
  const { outcome } = await deferred.userChoice;
  deferred = null;
  return outcome === 'accepted';
}
