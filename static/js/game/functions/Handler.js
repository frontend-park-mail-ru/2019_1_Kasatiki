export default class Handler {

    constructor(
        canvas
    ) {
        this.canvas = canvas;
        this.eventsMap = {
            // Нажатие клавиш
            'up': false,
            'left': false,
            'down': false,
            'right': false,

            // Нажатие мышки
            'mouseClick' : false,

            // Координаты мышки
            'mouseX' : 0,
            'mouseY' : 0
        }

        this.bounds = this.canvas.getBoundingClientRect();
        this._listenEvents();
    }

    _listenEvents() {
        const that = this;

        document.addEventListener('keydown', keyDownHandler, false);
        document.addEventListener('keyup', keyUpHandler, false);
        document.addEventListener('mousedown', mouseClickDown, false)
        document.addEventListener('mouseup', mouseClickUp, false)
        // document.addEventListener('click', mouseClickDown, false)

        document.body.onmousemove = function(evt) {
            that.eventsMap.mouseX = evt.pageX - that.bounds.left;
            that.eventsMap.mouseY = evt.pageY - that.bounds.top;
        }

        function mouseClickDown() {
            that.eventsMap.mouseClick = true;
        } 

        function mouseClickUp() {
            that.eventsMap.mouseClick = false;
        }


        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                that.eventsMap['right'] = true;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                that.eventsMap['left'] = true;
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                that.eventsMap['up'] = true;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                that.eventsMap['down'] = true;
            }
        }
        
        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                that.eventsMap['right'] = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                that.eventsMap['left'] = false;
            }
            else if(e.key == "Up" || e.key == "ArrowUp") {
                that.eventsMap['up'] = false;
            }
            else if(e.key == "Down" || e.key == "ArrowDown") {
                that.eventsMap['down'] = false;
            }
        }
    }


    addObject(name, obj) {
        this.objects[name]  = obj;
    }

    sendEventMap() {
        return this.eventsMap;
    }

}

