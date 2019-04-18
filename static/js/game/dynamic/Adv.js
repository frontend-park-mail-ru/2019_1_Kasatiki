import DynamicEssence from "./DynamicEssence.js";

export default class Adv extends DynamicEssence {
    constructor() {
        super(...arguments);

        this.xPrev = this.xPos;
        this.yPrev = this.yPos;

        this.curTargetX;
        this.curTargetY;

        this.centerX;
        this.centerY;

        this.name = 'adv';

        this.advUrl = 'http://ya.ru';

        this.teta;

        this.color = 9100;
    }
            // // Геттеры

            // get top() {
            //     return this.yPos;
            // }
        
            // get right() {
            //     return this.xPos + this.xSize;
            // }
        
            // get bottom() {
            //     return this.yPos + this.ySize;
            // }
        
            // get left() {
            //     return this.xPos;
            // }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
        ctx.fillStyle = '#ff' + this.color;
        ctx.fill();
        ctx.closePath();
    }

    logic(curTargetX, curTargetY) {
        this.centerY = this.yPos + this.ySize/2;
        this.centerX = this.xPos + this.xSize/2;

        this.curTargetX = curTargetX;
        this.curTargetY = curTargetY;

        this.teta = Math.atan2(this.curTargetX - this.xPos, this.curTargetY - this.yPos);

        this.xPrev = this.xPos;
        this.yPrev = this.yPos;

        this.xPos += this.velocity * Math.sin(this.teta);
        this.yPos += this.velocity * Math.cos(this.teta);
    }

    interact(obj) {
        if (obj.name == 'bullet') {
            this.hp -= 5;
            this.xPos = this.xPrev;
            this.yPos = this.yPrev;
            this.color -= 400;
            return this.hp;
        } else if (obj.name == 'player') {
            this.hp = 0;
            obj.hp -= 25;
            window.open(this.advUrl);
            return this.hp;
        } else if (obj.name == 'barrier') {
            // this.xPos = this.xPrev;
            // this.yPos = this.yPrev;

            // if (this.left < obj.right) {
            //     this.xPos = this.xPrev + 1;
            // } else if (this.right > obj.left) {
            //     console.log('sprava');
            //     this.xPos = this.xPrev - 1;
            // } else if (this.top < obj.bottom) {
            //     this.yPos = this.yPrev + 1;
            // } else if (this.bottom > obj.top) {
            //     this.yPos = this.yPrev - 1;
            // }

            if (this.curTargetX - this.center.x > 0) {
                if (this.right >= obj.left) {
                    // this.right = obj.left;
                    this.xPos -= this.velocity;
                } 
            } else if (this.curTargetX - this.center.x < 0) {
                if (this.left >= obj.right) {
                    // this.left = obj.right;
                    this.xPos += this.velocity;
                }
            }

            if (this.curTargetY - this.center.y > 0) {
                if (this.bottom >= obj.top) {
                    // this.bottom = obj.top;
                    this.yPos -= this.velocity;
                }
            } else if (this.curTargetY - this.center.y < 0) {
                if (this.top <= obj.bottom) {
                    // this.top = obj.bottom;
                    this.yPos += this.velocity;
                }
            }

            // if (this.left < obj.right || this.right > obj.left) {
            //     if (this.center.y - obj.top >= this.center.y - obj.bottom) {
            //         // this.yPos = this.yPrev;
            //         this.yPos -= this.velocity;
            //     } else if (this.center.y - obj.top <= this.center.y - obj.bottom) {
            //         // this.yPos = this.yPrev;
            //         this.yPos += this.velocity;
            //     }
            // } 
            
            // if (this.top < obj.bottom || this.bottom > obj.top) {
            //     if (this.center.x - obj.left >= this.center.x - obj.right) {
            //         // this.xPos = this.xPrev;
            //         this.xPos += this.velocity;
            //     } else if (this.center.x - obj.left <= this.center.x - obj.right){
            //         // this.xPos = this.xPrev;   
            //         this.xPos -= this.velocity;
            //     }
            // }

            // if (Math.abs(obj.xPos - this.curTargetX) >= Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
            //     this.xPos = this.xPrev + this.velocity;
            //     this.yPos = this.yPrev;
            // } else if (Math.abs(obj.xPos - this.curTargetX) < Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
            //     this.xPos = this.xPrev - this.velocity;
            //     this.yPos = this.yPrev
            // }

            // if (Math.abs(obj.yPos - this.curTargetY) >= Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
            //     this.yPos = this.yPrev + this.velocity;
            //     this.xPos = this.xPrev;
            // } else if (Math.abs(obj.yPos - this.curTargetY) < Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
            //     this.yPos = this.yPrev - this.velocity;
            //     this.xPos = this.xPrev;
            // }

        }
    }
}