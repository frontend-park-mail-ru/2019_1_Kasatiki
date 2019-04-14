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

        this.teta;

        this.color = 9100;
    }

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
            window.open('http://ya.ru');
            return this.hp;
        } else if (obj.name == 'barrier') {
            if (Math.abs(obj.xPos - this.curTargetX) > Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
                this.xPos = this.xPrev + this.velocity;
                this.yPos = this.yPrev;
            } else if (Math.abs(obj.xPos - this.curTargetX) < Math.abs(obj.xPos + obj.xSize - this.curTargetX)) {
                this.xPos = this.xPrev - this.velocity;
                this.yPos = this.yPrev;
            }

            if (Math.abs(obj.yPos - this.curTargetY) > Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
                this.yPos = this.yPrev + this.velocity;
                this.xPos = this.xPrev;
            } else if (Math.abs(obj.yPos - this.curTargetY) < Math.abs(obj.yPos + obj.ySize - this.curTargetY)) {
                this.yPos = this.yPrev - this.velocity;
                this.xPos = this.xPrev;
            }
        }
    }
}