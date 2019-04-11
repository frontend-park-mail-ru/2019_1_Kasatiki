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
        this.width = 100;
        this.height = 100;
    }

    set canvas(ctx) {
        this.ctx = ctx;
    } 

    _renderEssence(essence) {
        this.ctx.beginPath();
        this.ctx.rect(essence.xPos, essence.yPos, essence.xSize, essence.ySize);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();  
    }

    createCanvas() {
        this._root.innerHTML = '';
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
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