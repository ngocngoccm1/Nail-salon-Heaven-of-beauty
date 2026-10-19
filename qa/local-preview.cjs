const http = require('node:http');
const path = require('node:path');
const {createReadStream} = require('node:fs');
const {stat} = require('node:fs/promises');
const root = path.resolve(__dirname,'..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4','.woff2':'font/woff2'};
module.exports = async function startPreview(){
  const server = http.createServer(async(req,res)=>{
    try {
      const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
      if(!file.startsWith(root+path.sep))throw Error('Invalid path');
      const info=await stat(file);
      const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
      res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
      res.setHeader('Accept-Ranges','bytes');
      if(range){
        const start=Number(range[1]),end=range[2]?Number(range[2]):info.size-1;
        res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});
        createReadStream(file,{start,end}).pipe(res);
      } else {res.setHeader('Content-Length',info.size);createReadStream(file).pipe(res);}
    } catch {res.writeHead(404);res.end('Not found');}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  return {server,url:`http://127.0.0.1:${server.address().port}`};
};
