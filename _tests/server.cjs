const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'..'),site=path.join(__dirname,'.site');
const build=spawnSync('bundle',['exec','jekyll','build','--config','_config.yml,_config.preview.yml','--destination',site],{cwd:root,stdio:'inherit'});
if(build.status!==0)process.exit(build.status||1);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.xml':'application/xml','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.txt':'text/plain'};
const server=http.createServer((req,res)=>{let url;try{url=new URL(req.url,'http://localhost')}catch{res.writeHead(400).end();return}
 let pathname;try{pathname=decodeURIComponent(url.pathname)}catch{res.writeHead(400).end();return}
 let file=path.resolve(site,'.'+pathname);if(!file.startsWith(site+path.sep)&&file!==site){res.writeHead(403).end();return}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'+url.search}).end();return}file=path.join(file,'index.html')}
 const exists=fs.existsSync(file)&&fs.statSync(file).isFile();if(!exists)file=path.join(site,'404.html');
 if(!fs.existsSync(file)){res.writeHead(404).end();return}
 let body=fs.readFileSync(file),headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'};
 if(/gzip/.test(req.headers['accept-encoding']||'')&&/text|json|xml|svg/.test(headers['Content-Type'])){body=zlib.gzipSync(body);headers['Content-Encoding']='gzip';headers.Vary='Accept-Encoding'}
 res.writeHead(exists?200:404,headers);res.end(body);
});server.listen(Number(process.env.PORT||4179),'127.0.0.1');
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
