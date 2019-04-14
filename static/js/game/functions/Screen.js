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
    }

    set canvas(ctx) {
        this.ctx = ctx;
    } 

    _renderEssence(name, essence) {

    }

    createCanvas() {
        this._root.innerHTML = '';
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._root.appendChild(this._canvas);
        this.ctx = this._canvas.getContext('2d');
        return this._canvas;
    }

    render(objects = []) {
        // console.log(objects['barriers']);
        this.ctx.clearRect(0, 0, this.width, this.height);
        const that = this;
        objects['players'].forEach(obj => {
            obj.render(that.ctx);
            // that._renderEssence('players', obj);
        });
        objects['bullets'].forEach(obj => {
            obj.render(that.ctx);
        });
        objects['barriers'].forEach(obj => {
            obj.render(that.ctx);
        });
        objects['advs'].forEach(obj => {
            obj.render(that.ctx);
        });
        objects['shops'].forEach(obj => {
            obj.render(that.ctx);
        });
    }

    showInfo(score, health) {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "italic 20pt Arial";
        this.ctx.fillText('score: ' + score,this.width/2 - 250, 30);
        this.ctx.fillStyle = "red";
        this.ctx.font = "italic 20pt Arial";
        this.ctx.fillText('hp: ' + health,this.width/2 , 30);
    }

    showPauseTime(time) {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "italic 20pt Arial";
        this.ctx.fillText('pause: ' + time,this.width - 500, 30);
    }

    showWaveNumber(number) {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "italic 20pt Arial";
        this.ctx.fillText('Wave: ' + number,100, 30);
    }

    _resizeConvas() {

    }
}