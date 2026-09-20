const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Otevřít menu');navigation.classList.remove('open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Zavřít menu':'Otevřít menu');navigation.classList.toggle('open',open)});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu()});
const tabs=[...document.querySelectorAll('[data-tab]')];
function selectTab(name,focus=false){tabs.forEach(tab=>{const active=tab.dataset.tab===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.querySelector('#panel-'+tab.dataset.tab).hidden=!active;if(active&&focus)tab.focus()})}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab.dataset.tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectTab(tabs[next].dataset.tab,true)}})});
document.querySelectorAll('[data-price-link]').forEach(link=>link.addEventListener('click',()=>selectTab(link.dataset.priceLink)));
document.querySelector('#load-map').addEventListener('click',()=>{const map=document.querySelector('#map');const iframe=document.createElement('iframe');iframe.title='Heaven of beauty, Veveří 339/34, Brno';iframe.src='https://maps.google.com/maps?q=Heaven%20of%20beauty%20Veve%C5%99%C3%AD%20339%2F34%20Brno&output=embed';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.allowFullscreen=true;map.replaceChildren(iframe);map.classList.add('map-loaded')});
document.querySelector('#year').textContent=new Date().getFullYear();
const galleryButton=document.querySelector('#show-gallery');
galleryButton.addEventListener('click',()=>{
  const more=document.querySelector('#gallery-more');
  const expanded=galleryButton.getAttribute('aria-expanded')!=='true';
  more.hidden=!expanded;
  galleryButton.setAttribute('aria-expanded',String(expanded));
  galleryButton.innerHTML=expanded?'Zobrazit méně <span aria-hidden="true">−</span>':'Zobrazit další práce <span aria-hidden="true">+</span>';
});
