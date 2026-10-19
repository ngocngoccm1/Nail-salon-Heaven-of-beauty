const path = require('node:path');
const runtimeModules = path.resolve(path.dirname(process.execPath),'../node_modules');
const {chromium} = require(path.join(runtimeModules,'playwright'));
const sharp = require(path.join(runtimeModules,'sharp'));
(async()=>{
  const {server,url} = await require('./local-preview.cjs')();
  const browser = await chromium.launch({headless:true, executablePath:'C:/Users/noc/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'});
  try {
    const page = await browser.newPage();
    await page.goto(url);
    for(const name of ['salon-moment-01','salon-moment-02']){
      const frame = await page.evaluate(async(name)=>{
        const v=document.createElement('video');v.muted=true;v.src=`assets/video/${name}.mp4`;
        await new Promise((resolve,reject)=>{v.onloadedmetadata=resolve;v.onerror=()=>reject(Error(v.error?.message));});
        v.currentTime=Math.min(3,v.duration/2);
        await new Promise(resolve=>v.onseeked=resolve);
        const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);
        return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,data:c.toDataURL('image/png').split(',')[1]};
      },name);
      await sharp(Buffer.from(frame.data,'base64')).resize({width:720,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(__dirname,'../assets/video',`${name}.webp`));
      console.log(name,JSON.stringify({...frame,data:undefined}));
    }
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
