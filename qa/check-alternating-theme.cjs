const path=require('node:path');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const {chromium}=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));
const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
const luminance=v=>rgb(v).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const v=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (v[0]+.05)/(v[1]+.05)};
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
   assert(await page.locator('link[href="styles.css?v=20261103b"]').count());
   const bands=await page.locator('.section').evaluateAll(es=>es.map(e=>({id:e.id||'faq',background:getComputedStyle(e).backgroundColor,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})));
   for(const band of bands){
    const expected=['recenze','kontakt'].includes(band.id)?'rgb(40, 80, 90)':['pece','cenik','faq'].includes(band.id)?'rgb(205, 210, 208)':'rgb(223, 226, 224)';
    assert.equal(band.background,expected,band.id);
    assert(Math.abs(band.left)<1&&Math.abs(band.right-width)<1,`${band.id} must span full width`);
   }
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width}`);
   const colors=await page.locator('.hero h1,.hero h1 em,.section-intro>p,.faq summary,.faq>div>p,.pricing-note,.price-tabs button,.price-row h3,.price-row strong,.care-price-note,.contact .address,.contact-phone,.hours small,.footer-bottom').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>{
    let p=e;while(p&&getComputedStyle(p).backgroundColor==='rgba(0, 0, 0, 0)')p=p.parentElement;
    return {selector:e.className||e.tagName,color:getComputedStyle(e).color,background:p?getComputedStyle(p).backgroundColor:'rgb(223, 226, 224)'};
   }));
   const ratios=colors.map(e=>({...e,ratio:contrast(e.color,e.background)}));
   assert(ratios.every(e=>e.ratio>=4.5),JSON.stringify(ratios.filter(e=>e.ratio<4.5)));
   if(width<768){
    await page.locator('.menu-button').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'true');
    await page.locator('#navigation [href="#cenik"]').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');
   }
   await page.getByRole('tab',{name:'Řasy & obočí',exact:true}).click();
   assert(await page.locator('#panel-rasy').isVisible());
   await page.getByRole('tab',{name:'Manikúra',exact:true}).click();
   const prices=await page.locator('#panel-manikura').innerText();
   assert(prices.includes('520')&&prices.includes('250'));
   await page.locator('.faq details').first().locator('summary').click();
   assert(await page.locator('.faq details').first().getAttribute('open')!==null);
   await page.locator('.faq details').first().locator('summary').click();
   if(colorScheme==='light'&&[390,1440].includes(width)){
    await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
    for(const selector of ['.hero','#pece','#salon','#recenze','#cenik','.faq','#kontakt']){
     await page.locator(selector).screenshot({path:path.join(__dirname,`nov03-alternating-${selector.replace(/[.#]/g,'')}-${width}.png`),style:'.mobile-book,.skip{visibility:hidden!important}'});
    }
   }
   assert.deepEqual(errors,[]);
   results.push({width,colorScheme,bands,minimumTextContrast:Math.min(...ratios.map(e=>e.ratio)),overflow:false,menuAndPrices:'passed',faq:'passed',errors});
   await page.close();
  }
  await fs.writeFile(path.join(__dirname,'nov03-alternating-checks.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({width:r.width,colorScheme:r.colorScheme,fullWidthBands:true,minimumTextContrast:r.minimumTextContrast,overflow:r.overflow,errors:r.errors})),null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
