const path=require('node:path');
const fs=require('node:fs/promises');
const assert=require('node:assert/strict');
const {chromium}=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));
(async()=>{
  const {server,url}=await require('./local-preview.cjs')();
  const browser=await chromium.launch({headless:true,executablePath:'C:/Users/noc/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
  const results=[];
  try{
    for(const width of [320,390,768,1440]){
      const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',isMobile:width<768,hasTouch:width<768});
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
      await page.goto(url,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      const layout=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
      assert(layout.scroll<=width,`Overflow at ${width}: ${JSON.stringify(layout)}`);
      assert.equal(await page.locator('.hero-social a').count(),2);
      const social=await page.locator('.hero-social a').evaluateAll(a=>a.map(x=>({url:x.href,height:x.getBoundingClientRect().height})));
      assert(social.every(x=>x.height>=44));
      assert(social[0].url.includes('facebook.com/p/Heaven-of-beauty'));
      assert(social[1].url.includes('instagram.com/heaven_of_beauty_veveri_34'));
      assert.equal(await page.locator('.quality-card').count(),3);
      assert.equal(await page.locator('#pece img[src*="lashes-"]').count(),7);
      assert.equal(await page.locator('video').count(),5);
      const price=await page.locator('#panel-manikura').innerText();
      assert(price.includes('Shellac')&&price.includes('Manikúra je zahrnuta v ceně')&&price.includes('520')&&price.includes('250'));
      assert(!/P\.?Shine/i.test(await page.locator('body').innerText()));
      for(const selector of ['.hero','#proc-k-nam','.lash-gallery','#cenik']){
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.locator(selector+' img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
        if(width===390||width===1440)await page.locator(selector).screenshot({path:path.join(__dirname,`oct19-${selector.replace(/[.#]/g,'')}-${width}.png`)});
      }
      await page.getByRole('tab',{name:'Pedikúra',exact:true}).click();
      assert(await page.locator('#panel-pedikura').isVisible());
      await page.getByRole('tab',{name:'Modeláž',exact:true}).click();
      assert(await page.locator('#panel-modelaz').isVisible());
      await page.getByRole('tab',{name:'Manikúra',exact:true}).click();
      if(width<768){
        await page.locator('.menu-button').click();
        assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'true');
        await page.locator('#navigation a[href="#pece"]').click();
        assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');
      }
      const videos=[];
      for(let i=0;i<5;i++){
        const card=page.locator('.reel').nth(i);
        await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        await card.locator('button').click();
        await page.waitForFunction(i=>{const v=document.querySelectorAll('video')[i];return !v.paused&&v.currentTime>0},i);
        videos.push(await card.locator('video').evaluate(v=>({src:v.getAttribute('src'),width:v.videoWidth,height:v.videoHeight,muted:v.muted,playsinline:v.playsInline,error:v.error?.message||null})));
        assert(videos.at(-1).muted&&videos.at(-1).playsinline&&!videos.at(-1).error);
        await card.locator('button').click();
        assert(await card.locator('video').evaluate(v=>v.paused));
      }
      for(const image of await page.locator('img').all()){
        await image.evaluate(async i=>{i.loading='eager';await i.decode()});
      }
      assert.deepEqual(errors,[]);
      results.push({width,layout,social,videos,errors});
      await context.close();
    }
    const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
    await page.goto(url);
    const last=page.locator('.reel').last();
    await last.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const v=document.querySelectorAll('video')[4];return !v.paused&&v.currentTime>0});
    await page.locator('#kontakt').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>[...document.querySelectorAll('video')].every(v=>v.paused));
    results.push({autoplay:'passed',pauseOffscreen:'passed'});
    await fs.writeFile(path.join(__dirname,'oct19-checks.json'),JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
  } finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
