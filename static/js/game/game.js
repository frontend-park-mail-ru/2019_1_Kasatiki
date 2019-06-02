import Viewport from './viewport.js';
import startListen from './eventListeners.js';
import Socket from './ws.js';
import Config from './config.js';
import Objects from './objects.js';

export default class Game {
    constructor() {
        this.keyMap = {
            up    : false,
            left  : false,
            down  : false,
            right : false,
        
            shot  : false,
            angle : 0,
        
            zoom  : false,

            pause : false,
        }

        this.cfg;
        this.viewport;
        this.ws;
        this.objs;
    }

    gameStart() {
        this.cfg      = new Config();
        this.viewport = new Viewport();
        this.ws       = new Socket(location.host);
        
        this.objs     = new Objects(this.cfg, this.viewport);

        this.objs.map._createMap();
        this.ws.startServe(this.objs);
        startListen(this.keyMap, this.objs.map.canvas);
        // this.objs.map.setCanvasWH(this.viewport.gameScreenH, this.viewport.gameScreenW);
        requestAnimationFrame(() => this.loop());
    }

    loop() {
        this.objs.drawObjs(this.viewport);    
        this.viewport.update(this.objs.player.x, this.objs.player.y, this.keyMap.zoom, {val : this.objs.map.tileSize});
    
        this.objs.drawPlayers(this.viewport);
        this.objs.drawAdvs(this.viewport);
        this.objs.drawBullets(this.viewport);
    
        let json = JSON.stringify(this.keyMap);
    
        if (this.ws.socketOpen) {
            this.ws.socket.send(json);
        }
        requestAnimationFrame(() => this.loop());
    }
    
    _showAdv() {
        let advFrame = document.querySelector('.advframe');

        if (advFrame == undefined) {
            advFrame = document.createElement('iframe');
            advFrame.className = 'advframe';
            advFrame.src = this.objs.advUrl;
            console.log(this.objs.advUrl, advFrame.href)
            document.body.appendChild(advFrame);
        } else {
            advFrame.href = this.objs.advUrl;
        }

        setTimeout(() => {
            advFrame.remove();
            this.objs.pause = false;
        }, 5000);
    }
}