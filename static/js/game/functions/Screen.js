import Escape from '../static/escape.js'

export default class Screen {
    constructor(
        root = document.body
    ) {
        this._root = root;

        // Параметры canvas
        this._canvas = document.createElement('canvas');
        this.ctx;
        this._canvas.className = "gameScreen";

        // Размеры карты (видимая область)
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.escape = new Escape(700,500,200,50);
    }

    set canvas(ctx) {
        this.ctx = ctx;
    } 

    _renderEssence(name, essence) {
        this.ctx.beginPath();
        this.ctx.save();
        // this.ctx.rotate(essence.teta);
        this.ctx.rect(essence.xPos, essence.yPos, essence.xSize, essence.ySize);
        switch (name) {
            case 'players' : 
                this.ctx.fillStyle = "#48F67F";
                break;
            case 'buffers' :
                this.ctx.fillStyle = "#FF5555";
                break;
            case 'barriers' : 
                this.ctx.fillStyle = "#C9CAC9";
                break;
            case 'escape' :
                this.ctx.fillStyle = '#FF33F3';
                break;
        }
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.closePath();
    }

    createCanvas() {
        this._root.innerHTML = '';
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._root.appendChild(this._canvas);
        this.ctx = this._canvas.getContext('2d');

    }

    render(objects = []) {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        const that = this;
        objects['players'].forEach(obj => {
            that._renderEssence('players',obj);
        });
        objects['buffers'].forEach(obj => {
            that._renderEssence('buffers',obj);
        });
        objects['barriers'].forEach(obj => {
            that._renderEssence('barriers',obj);
        });

        this._renderEssence('escape',this.escape);
    }

    // ?? 
    _resizeConvas() {

    }
}