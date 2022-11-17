//registro de service worker
if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js')
    console.log('hola:sw')
}

//notificaciones
function msnPush(){
    Push.Permission.request();
    Push.create('Pokedex',{
        body: 'Nuevos pokemon',
        icon: '/pokedex.png',
        timeout: 150000,
        vibrate:[100,100,100],
        onClick: function(){
            //window.location='https://arturodiaz23.github.io/pokedex/'
            window.focus();
            this.close();
        }
    });
}

msnPush();