const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const touch=window.matchMedia('(hover: none)');
const header=document.querySelector<HTMLElement>('.site-header');
const zones=Array.from(document.querySelectorAll<HTMLElement>('main [data-theme]'));
const compactStorageKey='karu-header-compact';
let navigationCompact=false;
try{navigationCompact=sessionStorage.getItem(compactStorageKey)==='1';sessionStorage.removeItem(compactStorageKey);}catch{/* Storage is optional. */}
if(navigationCompact)header?.classList.add('compact');
let active='top';let ticking=false;let anchorNavigation=false;let anchorScrollTimer=0;
let lastScrollY=Math.max(0,scrollY),scrollDirection=0,scrollDistance=0;
function finishAnchorNavigation(){anchorNavigation=false;lastScrollY=Math.max(0,scrollY);scrollDistance=0;if(navigationCompact)header?.classList.add('compact');}
function revealHeaderFromUpwardInput(){
 anchorNavigation=false;navigationCompact=false;clearTimeout(anchorScrollTimer);scrollDistance=0;
 header?.classList.remove('compact');
}
function updateHeaderDirection(){
 const y=Math.max(0,scrollY),delta=y-lastScrollY;lastScrollY=y;
 if(anchorNavigation){header?.classList.toggle('compact',navigationCompact);scrollDistance=0;return;}
 if(y<65){header?.classList.toggle('compact',navigationCompact);scrollDistance=0;return;}
 if(Math.abs(delta)<1)return;
 const direction=delta>0?1:-1;
 if(direction!==scrollDirection){scrollDistance=0;scrollDirection=direction;}
 scrollDistance+=Math.abs(delta);
 if(scrollDistance>(direction>0?24:10)){
  const keyboardFocus=header?.querySelector(':focus-visible');
  if(direction<0)navigationCompact=false;
  header?.classList.toggle('compact',direction>0&&!keyboardFocus);
 }
}
function updateScroll(){
 ticking=false;
 const dominant=zones.find(z=>{const r=z.getBoundingClientRect();return r.top<=innerHeight*.45&&r.bottom>innerHeight*.45;});
 active=dominant?.id||'top';
 document.querySelectorAll<HTMLAnchorElement>('[data-section]').forEach(a=>{if(a.dataset.section===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 if(document.querySelector('.hero'))document.querySelectorAll<HTMLAnchorElement>('[data-language]').forEach(a=>{a.hash=active==='top'?'':active;});
}
document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach(link=>link.addEventListener('click',()=>{
 const destination=new URL(link.href,location.href);
 if(destination.pathname!==location.pathname||!destination.hash)return;
 anchorNavigation=true;navigationCompact=!link.matches('.wordmark,.footer-brand');header?.classList.toggle('compact',navigationCompact);clearTimeout(anchorScrollTimer);
 anchorScrollTimer=window.setTimeout(finishAnchorNavigation,500);
}));
document.addEventListener('click',event=>{
 const link=(event.target as Element|null)?.closest<HTMLAnchorElement>('a[href]');
 if(!link||event.defaultPrevented||link.target==='_blank'||link.hasAttribute('download'))return;
 const destination=new URL(link.href,location.href);
 if(destination.origin!==location.origin||destination.href===location.href)return;
 if(link.matches('.wordmark,.footer-brand')){
  navigationCompact=false;header?.classList.remove('compact');
  try{sessionStorage.removeItem(compactStorageKey);}catch{/* Storage is optional. */}
  return;
 }
 navigationCompact=true;header?.classList.add('compact');
 if(destination.pathname!==location.pathname||destination.search!==location.search){try{sessionStorage.setItem(compactStorageKey,'1');}catch{/* Storage is optional. */}}
},{capture:true});
addEventListener('wheel',event=>{if(event.deltaY<0)revealHeaderFromUpwardInput();},{passive:true});
addEventListener('keydown',event=>{if(['ArrowUp','PageUp','Home'].includes(event.key)||(event.key===' '&&event.shiftKey))revealHeaderFromUpwardInput();});
let previousTouchY=0;
addEventListener('touchstart',event=>{previousTouchY=event.touches[0]?.clientY||0;},{passive:true});
addEventListener('touchmove',event=>{const y=event.touches[0]?.clientY||0;if(y>previousTouchY+4)revealHeaderFromUpwardInput();previousTouchY=y;},{passive:true});
addEventListener('scroll',()=>{
 if(anchorNavigation){clearTimeout(anchorScrollTimer);anchorScrollTimer=window.setTimeout(finishAnchorNavigation,180);}
 updateHeaderDirection();if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}
},{passive:true});
header?.addEventListener('focusin',event=>{if(!(navigationCompact&&event.target===header.querySelector('.menu-button')))header.classList.remove('compact');});
addEventListener('resize',()=>{lastScrollY=Math.max(0,scrollY);scrollDistance=0;updateScroll();});addEventListener('pageshow',updateScroll);updateScroll();
if(document.querySelector('.hero')&&location.hash&&!new URLSearchParams(location.search).has('return')){
 const alignHash=()=>{
  const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if(target) window.scrollTo({top:target.offsetTop,behavior:'instant'});
 };
 document.fonts?.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(alignHash)));
}
document.querySelectorAll<HTMLElement>('.scramble').forEach(el=>{
 const text=el.dataset.text||'';const target=el.querySelector<HTMLElement>('.scramble-text');const link=el.closest('a');let frame=0;
 if(!target)return;
 target.textContent='';
 const letters=Array.from(text).map(char=>{
  const slot=document.createElement('span');slot.className='scramble-slot';
  const measure=document.createElement('span');measure.className='glyph-measure';measure.textContent=char===' '?'\u00a0':char;
  const glyph=document.createElement('span');glyph.className='scramble-glyph';glyph.textContent=char;
  slot.append(measure,glyph);target.append(slot);return {char,glyph};
 });
 const reset=()=>{cancelAnimationFrame(frame);letters.forEach(({char,glyph})=>glyph.textContent=char);};
 const run=()=>{
  reset();if(reduced.matches||touch.matches)return;
  const start=performance.now(),chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ';let previousStep=-1;
  const tick=(now:number)=>{
   const elapsed=now-start,step=Math.floor(elapsed/32);
   if(step!==previousStep){
    letters.forEach(({char,glyph},i)=>{
     const resolvesAt=100+(i/Math.max(1,letters.length-1))*280;
     glyph.textContent=char===' '||elapsed>=resolvesAt?char:chars[Math.floor(Math.random()*chars.length)];
    });previousStep=step;
   }
   if(elapsed<400)frame=requestAnimationFrame(tick);else reset();
  };
  tick(start);
 };
 link?.addEventListener('pointerenter',run);link?.addEventListener('focus',run);link?.addEventListener('blur',reset);reduced.addEventListener('change',reset);
});
const menu=document.querySelector<HTMLDialogElement>('#mobile-menu');const trigger=document.querySelector<HTMLButtonElement>('.menu-button');let savedOverflow='';
function closeMenu(){menu?.close();}
trigger?.addEventListener('click',()=>{savedOverflow=document.body.style.overflow;menu?.showModal();document.body.style.overflow='hidden';trigger.setAttribute('aria-expanded','true');});
menu?.querySelector('.menu-close')?.addEventListener('click',closeMenu);
menu?.addEventListener('keydown',event=>{
 if(event.key!=='Tab')return;
 const items=Array.from(menu.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
 const first=items[0],last=items[items.length-1];
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
menu?.addEventListener('close',()=>{document.body.style.overflow=savedOverflow;trigger?.setAttribute('aria-expanded','false');trigger?.focus({preventScroll:true});});
menu?.addEventListener('click',e=>{if(e.target===menu&&e.clientX<menu.getBoundingClientRect().left)closeMenu();});
addEventListener('resize',()=>{if(innerWidth>850&&menu?.open)closeMenu();});
document.querySelectorAll<HTMLButtonElement>('.copy-email').forEach(button=>button.addEventListener('click',async()=>{const status=button.parentElement?.querySelector('.copy-status');try{await navigator.clipboard.writeText(button.dataset.email||'');if(status)status.textContent=button.dataset.success||'';}catch{if(status)status.textContent=button.dataset.error||'';}}));
document.querySelectorAll<HTMLElement>('[data-player]').forEach(player=>{
 const video=player.querySelector<HTMLVideoElement>('video');
 const unmute=player.querySelector<HTMLButtonElement>('[data-unmute]');
 if(!video||!unmute)return;
 unmute.addEventListener('click',()=>{
  video.muted=false;video.volume=1;video.play().catch(()=>{});unmute.remove();
 });
});
const stage=document.querySelector<HTMLElement>('.hero-stage');const motionButton=document.querySelector<HTMLButtonElement>('.motion-toggle');let userPaused=false;
const visibility=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('in-view',entry.isIntersecting);if(entry.target instanceof HTMLVideoElement){if(entry.isIntersecting&&!reduced.matches&&!document.hidden)entry.target.play().catch(()=>{});else entry.target.pause();}}),{threshold:.05});
document.querySelectorAll('.hero-stage,video[data-video]').forEach(el=>visibility.observe(el));
function syncMotion(){const paused=userPaused||reduced.matches||document.hidden;stage?.classList.toggle('paused',paused);if(motionButton){motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=(paused?motionButton.dataset.play:motionButton.dataset.pause)||'';}document.querySelectorAll<HTMLVideoElement>('video').forEach(v=>{if(paused)v.pause();else if(v.classList.contains('in-view'))v.play().catch(()=>{});});}
motionButton?.addEventListener('click',()=>{userPaused=!userPaused;syncMotion();});reduced.addEventListener('change',syncMotion);document.addEventListener('visibilitychange',syncMotion);syncMotion();
// Native history restores browser Back. Explicit return restores the card position.
document.querySelectorAll<HTMLAnchorElement>('.project-card').forEach(a=>a.addEventListener('click',()=>{try{sessionStorage.setItem('karu-work-position',JSON.stringify({path:location.pathname,y:scrollY}));}catch{/* Storage may be unavailable. Anchor return remains valid. */}}));
if(document.querySelector('.hero')&&location.hash==='#work'&&new URLSearchParams(location.search).has('return')){
 try{const saved=JSON.parse(sessionStorage.getItem('karu-work-position')||'null');if(saved?.path===location.pathname&&typeof saved.y==='number')requestAnimationFrame(()=>{scrollTo({top:saved.y,behavior:'instant'});history.replaceState(null,'',location.pathname+'#work');});}catch{/* Fall back to work anchor. */}
}
