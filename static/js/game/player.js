export default class Player {
    constructor(
        x, y, ctx
    ) {
        this.x = x;
        this.y = y;

        this.id = 1;

        this.hp = 80;
        this.hpc = 100;

        this.v = 5;

        this.c = 0.2;
        this.ctx = ctx;
    }

    draw(viewport) {
        this.ctx.fillStyle = '#45FF70';
        this.ctx.fillRect(Math.round(this.x - viewport.x - viewport.zoom), Math.round(this.y - viewport.y - viewport.zoom), viewport.tileSize, viewport.tileSize);
    }
}