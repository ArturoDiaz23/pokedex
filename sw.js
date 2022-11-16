importScripts('js/sw-utils.js')

const CACHE_STATIC = 'static-v2';
const CACHE_DYNAMIC = 'dynamic-v2';
const CACHE_INMUTABLE = 'inmutable-v2';


const AS_STATIC =[
    '/',
    '/index.html',
    '/js/app.js',
    '/js/main.js',
    '/blob.svg',
    '/style.css',
    '/js/sw-utils.js'
];

const AS_INMUTABLE=[
    'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js'
];

//evento install
self.addEventListener('install', e =>{
    //cache static
    const cacheStatic = caches.open(CACHE_STATIC).then(cache=>{
        return cache.addAll(AS_STATIC);
    });
    //cache inmutable
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache =>{
        return cache.addAll(AS_INMUTABLE)
    });

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
    //self.skipWaiting();
});

//evento activate
self.addEventListener('activate',e=>{
    const respuesta = caches.keys().then(keys=>{
        keys.forEach(key=>{
            if(key!= CACHE_STATIC && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});

self.addEventListener('fetch',e=>{
    //conprobando si existe el recurso
    const respuesta = caches.match(e.request).then(res=>{
        if(res){
            return res;
        }else{
            //si no existe, hacer peticion
            return fetch(e.request).then(newRes=>{
                return updateDynamic(CACHE_DYNAMIC,e.request,newRes)
            });
        }
        
    });
    e.respondWith(respuesta);
});