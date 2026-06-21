const CACHE='reading-room-v1';
const CORE=["index.html", "2026-06-21.html", "2026-06-16.html", "2026-06-15.html", "2026-06-14.html", "2026-06-12.html", "2026-06-11.html", "2026-06-10.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));});
