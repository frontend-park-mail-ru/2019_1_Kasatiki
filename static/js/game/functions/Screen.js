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

    _renderEssence(essence) {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.rotate(essence.teta);
        this.ctx.rect(essence.xPos, essence.yPos, essence.xSize, essence.ySize);
        this.ctx.fillStyle = "#0095DD";
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
        objects.forEach(obj => {
            that._renderEssence(obj);
        });
    }

    // ?? 
    _resizeConvas() {

    }
}