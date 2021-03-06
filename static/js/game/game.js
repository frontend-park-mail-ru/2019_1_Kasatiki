import Viewport from './viewport.js';
import startListen from './eventListeners.js';
import Socket from './ws.js';
import Config from './config.js';
import Objects from './objects.js'; 

import EndView from '../views/EndView.js'

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
            close : false,
        }

        this.endView = new EndView;

        this.dead = false;

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

        const gameBackBtn = document.querySelector('.game-back');
        gameBackBtn.addEventListener('click', () => {
            console.log('close')
            this.keyMap.close = true;
            let json = JSON.stringify(this.keyMap);
            if (this.ws.socketOpen) {
                this.ws.socket.send(json);
            }
        })

        // this.objs.map.setCanvasWH(this.viewport.gameScreenH, this.viewport.gameScreenW);
        requestAnimationFrame(() => this.loop());
    }

    loop() {
        if (this.dead) {
            this.endView.show(this.score)
        }

        this.objs.drawObjs(this.viewport);    
        this.viewport.update(this.objs.player.x, this.objs.player.y, this.keyMap.zoom, {val : this.objs.map.tileSize});
    
        this.objs.drawPlayers(this.viewport, this.keyMap.zoom);
        this.objs.drawAdvs(this.viewport);
        this.objs.drawBullets(this.viewport);
        this.objs.drawInterface(this.viewport, this.keyMap.zoom);
    
        if (this.objs.advUrl != '' && this.objs.advUrl != undefined) {
            this._showAdv();
        }

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
            this.objs.advUrl = '';
            this.objs.pause = false;
        }, 5000);
    }
}