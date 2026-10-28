const path=require('node:path');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const {chromium}=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));
(async()=>{
 const {server,url}=await require('./local-preview.cjs')();
 const browser=await chromium.launch({headless:true,executablePath:'C:/Users/noc/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
 const results=[];
 try{
  for(const width of [320,390,768,1440])for(const colorScheme of ['light','dark']){
   const page=await browser.newPage({viewport:{width,height:900},colorScheme,reducedMotion:'reduce'});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
   await page.goto(url,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   assert(await page.locator('link[href="styles.css?v=20261028"]').count());
   const backgrounds=await page.locator('html,body,main,.header,.hero,.quick-info,.section,footer').evaluateAll(es=>es.map(e=>({section:e.id||e.className||e.tagName,background:getComputedStyle(e).backgroundColor})));
   assert(backgrounds.every(e=>e.background==='rgb(250, 249, 246)'),JSON.stringify(backgrounds));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(colorScheme==='light'&&[390,1440].includes(width)){
    await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()})));
    await page.locator('.hero').screenshot({path:path.join(__dirname,'oct28-hero-'+width+'.png'),style:'.mobile-book,.skip{visibility:hidden!important}'});
    for(const id of ['recenze','cenik']){
     await page.locator('#'+id).scrollIntoViewIfNeeded();
     await page.evaluate(id=>window.scrollTo(0,document.querySelector('#'+id).getBoundingClientRect().top+scrollY-350),id);
     await page.screenshot({path:path.join(__dirname,'oct28-boundary-'+id+'-'+width+'.png'),style:'.mobile-book,.skip{visibility:hidden!important}'});
    }
   }
   assert.deepEqual(errors,[]);
   results.push({width,colorScheme,backgrounds,overflow:false,errors});
   await page.close();
  }
  await fs.writeFile(path.join(__dirname,'oct28-background-checks.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(r=>({width:r.width,colorScheme:r.colorScheme,uniform:r.backgrounds.every(e=>e.background==='rgb(250, 249, 246)'),overflow:r.overflow,errors:r.errors}))));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
