const path=require('node:path');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const {chromium}=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));
(async()=>{
 const {server,url}=await require('./local-preview.cjs')();
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/noc/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
 const prices=JSON.parse(await fs.readFile(path.join(__dirname,'lash-prices-oct25.json'),'utf8'));
 const reports=[];
 const captureStyle='.mobile-book,.skip{visibility:hidden!important}';
 try{
  for(const width of [320,390,768,1024,1440]){
   const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
   await page.goto(url,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Page overflows at ${width}`);
   assert.equal(await page.locator('#salon img').count(),7);
   const oldPrice=await page.locator('#panel-manikura .price-row').evaluateAll(rows=>rows.map(r=>[r.querySelector('h3').textContent,r.querySelector('strong').textContent.trim()]));
   assert.deepEqual(oldPrice,[['Shellac','520 Kč'],['Manikúra','250 Kč']]);
   await page.locator('.care-actions [data-price-link="rasy"]').click();
   assert(await page.locator('#panel-rasy').isVisible());
   for(let i=0;i<prices.groups.length;i++){
    const group=page.locator('.lash-price-group').nth(i);
    if(!await group.getAttribute('open').then(v=>v!==null))await group.locator('summary').click();
    assert.equal(await group.locator('.price-row strong').innerText(),`${prices.groups[i].new_set} Kč`);
    const rows=await group.locator('.refill-prices>div').evaluateAll(rows=>rows.map(r=>[r.querySelector('dt').textContent,Number(r.querySelector('dd').textContent.replace(/\D/g,''))]));
    assert.deepEqual(rows,prices.groups[i].refills);
    if(i>0)await group.locator('summary').click();
   }
   const lamination=page.locator('.lash-price-group').last();
   await lamination.locator('summary').click();
   const rows=await lamination.locator('.refill-prices>div').evaluateAll(rows=>rows.map(r=>[r.querySelector('dt').textContent,Number(r.querySelector('dd').textContent.replace(/\D/g,''))]));
   assert.deepEqual(rows,prices.lamination);
   if(width===390||width===1440)await lamination.screenshot({path:path.join(__dirname,`oct25-lamination-${width}.png`),style:captureStyle});
   await lamination.locator('summary').click();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Expanded prices overflow at ${width}`);
   await page.getByRole('tab',{name:'Pedikúra',exact:true}).click();
   assert(await page.locator('#panel-pedikura').isVisible());
   await page.getByRole('tab',{name:'Modeláž',exact:true}).click();
   assert(await page.locator('#panel-modelaz').isVisible());
   await page.getByRole('tab',{name:'Manikúra',exact:true}).focus();
   await page.keyboard.press('End');
   assert.equal(await page.locator('#tab-rasy').getAttribute('aria-selected'),'true');
   await page.keyboard.press('Home');
   assert.equal(await page.locator('#tab-manikura').getAttribute('aria-selected'),'true');
   if(width<768){
    await page.locator('.menu-button').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'true');
    await page.locator('#navigation [href="#salon"]').click();
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');
   }
   for(const colorScheme of ['light','dark']){
    await page.emulateMedia({colorScheme});
    const backgrounds=await page.locator('.header,.quick-info,#pece,#salon,#recenze,#sluzby,#cenik,#inspirace,.faq,#kontakt,footer').evaluateAll(els=>els.map(e=>({name:e.id||e.className||e.tagName,bg:getComputedStyle(e).backgroundColor})));
    assert(backgrounds.every(e=>['rgb(250, 249, 246)','rgba(0, 0, 0, 0)'].includes(e.bg)),JSON.stringify(backgrounds));
   }
   for(const img of await page.locator('img').all())await img.evaluate(async i=>{i.loading='eager';await i.decode()});
   if(width===390||width===1440){
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:path.join(__dirname,`oct25-top-${width}.png`)});
    for(const name of ['salon','recenze','kontakt'])await page.locator('#'+name).screenshot({path:path.join(__dirname,`oct25-${name}-${width}.png`),style:captureStyle});
    await page.getByRole('tab',{name:'Řasy & obočí',exact:true}).click();
    await page.locator('#cenik').screenshot({path:path.join(__dirname,`oct25-lash-prices-${width}.png`),style:captureStyle});
   }
   assert.deepEqual(errors,[]);
   reports.push({width,uniformLightBackground:true,lashPrices:'passed',lamination:'passed',originalNailPrices:'passed',tabsAndKeyboard:'passed',salonImages:7,overflow:false,errors});
   await page.close();
  }
  await fs.writeFile(path.join(__dirname,'oct25-checks.json'),JSON.stringify(reports,null,2)+'\n');
  console.log(JSON.stringify(reports,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
