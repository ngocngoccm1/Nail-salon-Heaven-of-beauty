const path=require('node:path');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const {chromium}=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));
const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
const luminance=rgb=>rgb.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const v=[luminance(rgb(a)),luminance(rgb(b))].sort((x,y)=>y-x);return (v[0]+.05)/(v[1]+.05)};
(async()=>{
 const {server,url}=await require('./local-preview.cjs')();
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/noc/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
 const results=[];
 try{
  for(const width of [320,390,768,1440])for(const colorScheme of ['light','dark']){
   const page=await browser.newPage({viewport:{width,height:900},colorScheme,reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
   await page.goto(url,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   assert(await page.locator('link[href="styles.css?v=20261103"]').count());
   const backgrounds=await page.locator('html,body,main,.header,.hero,.quick-info,.section,footer').evaluateAll(es=>es.map(e=>({section:e.id||e.className||e.tagName,background:getComputedStyle(e).backgroundColor})));
   assert(backgrounds.every(e=>e.background==='rgb(24, 57, 43)'),JSON.stringify(backgrounds));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width}`);
   const colors=await page.locator('.hero h1,.hero h1 em,.section-intro>p,.faq summary,.faq>div>p,.pricing-note,.price-tabs button,.price-row h3,.price-row strong,.care-price-note,.contact .address,.contact-phone,.hours small,.footer-bottom').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>({selector:e.className||e.tagName,color:getComputedStyle(e).color})));
   const contrasts=colors.map(e=>({...e,ratio:contrast(e.color,'rgb(24, 57, 43)')}));
   assert(contrasts.every(e=>e.ratio>=4.5),JSON.stringify(contrasts.filter(e=>e.ratio<4.5)));
   const buttonColors=await page.locator('.hero-actions .button').evaluate(e=>{const s=getComputedStyle(e);return {text:s.color,background:s.backgroundColor}});
   assert(contrast(buttonColors.text,buttonColors.background)>=4.5);
   if(width<768){
    await page.locator('.menu-button').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'true');
    await page.locator('#navigation [href="#cenik"]').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');
   }
   await page.getByRole('tab',{name:'Řasy & obočí',exact:true}).click();
   assert(await page.locator('#panel-rasy').isVisible());
   const group=page.locator('.lash-price-group').nth(1);
   await group.locator('summary').click();
   assert(await group.getAttribute('open')!==null);
   await group.locator('summary').click();
   await page.getByRole('tab',{name:'Manikúra',exact:true}).click();
   assert((await page.locator('#panel-manikura').innerText()).includes('520'));
   if(colorScheme==='dark'&&[390,1440].includes(width)){
    await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
    for(const selector of ['.hero','.faq','#cenik','#recenze','#kontakt']){
     await page.locator(selector).screenshot({path:path.join(__dirname,`nov03-${selector.replace(/[.#]/g,'')}-${width}.png`),style:'.mobile-book,.skip{visibility:hidden!important}'});
    }
   }
   assert.deepEqual(errors,[]);
   results.push({width,colorScheme,uniformBackground:true,minimumTextContrast:Math.min(...contrasts.map(e=>e.ratio)),buttonContrast:contrast(buttonColors.text,buttonColors.background),overflow:false,menuAndPrices:'passed',errors});
   await page.close();
  }
  await fs.writeFile(path.join(__dirname,'nov03-forest-checks.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
