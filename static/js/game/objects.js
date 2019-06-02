import Map from './map.js';
import Player from './player.js';

export default class Objects {
    constructor(
        cfg,
        vp
    ) {
        this.objs = {
            'bullets' : [],
            'advs'    : [],
            'buffs'   : [],
            'enemy'   : [],
        };
        
        this.cfg = cfg;

        this.map = new Map();
        this.map.setCanvasWH(vp.gameScreenW * vp.tileSize, vp.gameScreenH * vp.tileSize);

        this.player = new Player(this.map.mapSize * vp.tileSize / 2, this.map.mapSize * vp.tileSize / 2, this.map.ctx);
        this.enemy = {
            x : 0,
            y : 0,
        }

        this.advUrl = 'https://vk.com/feed';
    }

    drawObjs(viewport) {
        // Стираем все что есть на канвасе
        this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height);

        // Отрисовываем карту
        this.map.drawMap(viewport);

        // this.objs.forEach( obj => {
        //     obj.forEach( ess => {
        //         this.map.ctx.fillStyle = cfg.color(ess[obj]);
        //         this.map.ctx.fillRect(ess.object.x - this,map.viewport.x, ess.object.y - this,map.viewport.x, this.map.tileSize, this.map.tileSize);
        //     })
        // })
    }

    drawPlayers(viewport) {
        this.player.draw(viewport, {val : this.map.tileSize});
        this.drawEnemy(viewport);
    }

    drawEnemy(viewport) {
        this.map.ctx.fillStyle = '#F52B00';
        this.map.ctx.fillRect(Math.round(this.enemy.x - viewport.x - viewport.zoom), Math.round(this.enemy.y - viewport.y - viewport.zoom), viewport.tileSize, viewport.tileSize);
    }

    drawAdvs(viewport) {
        if (this.objs['advs'].length > 1) {
            for (let i = 0; i < this.objs['advs'].length; i++) {
                this.map.ctx.fillStyle = '#ffffff';
                this.map.ctx.fillRect(Math.round(this.objs['advs'][i].object.x - viewport.x), Math.round(this.objs['advs'][i].object.y - viewport.y), viewport.tileSize, viewport.tileSize);
            }
        }
    }

    drawBullets(viewport) {
        if (this.objs['bullets'].length != 0) {
            for (let i = 0; i < this.objs['bullets'].length; i++) {
                this.map.ctx.fillStyle = '#ffff00';
                this.map.ctx.fillRect(this.objs['bullets'][i].object.x - viewport.x, this.objs['bullets'][i].object.y - viewport.y, 5, 5);
            }
        }
    }
}