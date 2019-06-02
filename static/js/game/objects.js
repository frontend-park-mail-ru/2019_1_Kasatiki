import Map from './map.js';
import Player from './player.js';

export default class Objects {
    constructor(
        cfg,
        vp
    ) {
        this.bullets = [];
        this.advs = [];
        
        this.cfg = cfg;

        this.opacity = 1;

        this.deltax = 0;
        this.deltay = 0;

        this.score = 50;
        this.backImg = new Image(30, 30);
        this.backImg.src = '../../icons/cross.png';

        this.map = new Map();
        this.map.setCanvasWH(vp.gameScreenW * vp.tileSize, vp.gameScreenH * vp.tileSize);

        this.player = new Player(this.map.mapSize * vp.tileSize / 2, this.map.mapSize * vp.tileSize / 2, this.map.ctx);
        this.enemy = {
            x : 2700,
            y : 2500,
            deltax : 0,
            deltay : 0,
        }

        this.advUrl = '';
    }

    drawObjs(viewport) {
        // Стираем все что есть на канвасе
        this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height);

        // Отрисовываем карту
        this.map.drawMap(viewport);
    }

    drawPlayers(viewport, zoom) {
        this.player.draw(viewport, {val : this.map.tileSize});
        this.drawEnemy(viewport, zoom);
    }

    drawEnemy(viewport, zoom) {
        this.map.ctx.fillStyle = '#F52B00';
        // console.log('delta',zoom, this.enemy.deltax, this.enemy.deltay)
        this.enemy.deltax = this.enemy.x - viewport.x - viewport.zoom - 400;
        this.enemy.deltay = this.enemy.y - viewport.y - viewport.zoom - 400;
        this.map.ctx.fillRect(Math.round(this.enemy.x - viewport.x - viewport.zoom - this.enemy.deltax * (1 - viewport.tileSize / viewport.baseTileSize)), Math.round(this.enemy.y - viewport.y - viewport.zoom - this.enemy.deltay * (1 - viewport.tileSize / viewport.baseTileSize)), viewport.tileSize, viewport.tileSize);
    }

    drawAdvs(viewport) {
        let that = this;
        if (that.advs.length > 0) {
            // console.log(that.advs.length)
            for (let i = 0; i < that.advs.length; i++) {
                that.map.ctx.fillStyle = '#ffffff';
                that.deltax = that.advs[i].object.x - viewport.x - viewport.zoom - 400;
                that.deltay = that.advs[i].object.y - viewport.y - viewport.zoom - 400;
                that.map.ctx.fillRect(Math.round(that.advs[i].object.x - viewport.x - viewport.zoom - that.deltax * (1 - viewport.tileSize / viewport.baseTileSize)), Math.round(that.advs[i].object.y - viewport.y - viewport.zoom - that.deltay * (1 - viewport.tileSize / viewport.baseTileSize)), viewport.tileSize, viewport.tileSize);
                // console.log(that.advs[i].object.x, that.deltay, Math.round(that.advs[i].x - viewport.x - viewport.zoom - that.deltax * (1 - viewport.tileSize / viewport.baseTileSize)), Math.round(that.advs[i].y - viewport.y - viewport.zoom - that.deltay * (1 - viewport.tileSize / viewport.baseTileSize)))
            }
        }
    }

    drawBullets(viewport) {
        if (this.bullets.length != 0) {
            for (let i = 0; i < this.bullets.length; i++) {
                this.map.ctx.fillStyle = '#ffff00';
                if (viewport.tileSize == viewport.baseTileSize) {
                    this.map.ctx.fillRect(this.bullets[i].object.x - viewport.x - viewport.zoom, this.bullets[i].object.y - viewport.y - viewport.zoom, 5, 5);
                } else {
                    this.map.ctx.fillRect(this.bullets[i].object.x - viewport.x - viewport.zoom - (viewport.baseTileSize - viewport.tileSize) / 2, this.bullets[i].object.y - viewport.y - viewport.zoom - (viewport.baseTileSize - viewport.tileSize) / 2, 5, 5);
                }
            }
        }
    }

    drawInterface(viewport, zoom) {
        if (zoom) {
            if (this.opacity > 0) {
                this.opacity -= 0.05;
            } 
        } else {
            if (this.opacity < 1) {
                this.opacity += 0.05;
            }
        }

        // Render hp bar
        this.map.ctx.fillStyle = 'rgba(255, 60, 60, ' + this.opacity + ')';
        this.map.ctx.fillRect(viewport.baseTileSize / 2, viewport.baseTileSize / 2, viewport.baseTileSize * 5 * (this.player.hp / this.player.hpc) / 2, viewport.baseTileSize / 2);
        this.map.ctx.strokeStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        this.map.ctx.strokeRect(viewport.baseTileSize / 2, viewport.baseTileSize / 2, viewport.baseTileSize * 5 /2, viewport.baseTileSize / 2);

        // Render score
        this.map.ctx.font = '30px san-serif';
        this.map.ctx.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        this.map.ctx.fillText(this.score.toString(), viewport.baseTileSize * 8,viewport.baseTileSize);

        // Render back button
        // this.map.ctx.drawImage(this.backImg, viewport.baseTileSize * 15, viewport.baseTileSize / 2); 
    }
}