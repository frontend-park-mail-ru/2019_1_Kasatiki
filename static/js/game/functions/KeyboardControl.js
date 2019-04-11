export default class KeyboardControl {
    constructor() {
        this.keys = {
            'up': false,
            'left': false,
            'down': false,
            'right': false,
        }

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
        
        const that = this;

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                that.keys['right'] = true;
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