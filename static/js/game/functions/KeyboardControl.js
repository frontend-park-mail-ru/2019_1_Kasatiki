export default class KeyboardControl {
    constructor() {
        this.keys = {
            'up': false,
            'left': false,
            'down': false,
            'right': false,
            'mouseX' : 0,
            'mouseY' : 0
        }
        const that = this;

        this.mouseX = 0;
        this.mouseY = 0;

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);

        document.body.onmousemove = function(evt) {
            that.mouseX = evt.pageX;
            that.mouseY = evt.pageY;
        }
        

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                that.keys['right'] = true;
                console.log('right');
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                that.keys['left'] = true;
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                that.keys['up'] = true;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                that.keys['down'] = true;
            }
        }
        
        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                that.keys['right'] = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                that.keys['left'] = false;
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                that.keys['up'] = false;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                that.keys['down'] = false;
            }
        }
    }

    handleKey() {
        return this.keys;
    }


}