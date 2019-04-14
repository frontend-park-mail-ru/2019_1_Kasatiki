// import KeyboardControl from '../functions/KeyboardControl.js'

import Bullet from './bullet.js'
import DynamicEssence from "./DynamicEssence.js";

export default class Player extends DynamicEssence {
    
    constructor(
    ) {
        super(...arguments);
        // this.keyHandler = new KeyboardControl();

        this.name = 'player'

        this.defaultVelocity = this.velocity;
        this.buffs = [];

        this.centerX;
        this.centerY;

        this.xPrev = this.xPos;
        this.yPrev = this.yPos;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
        ctx.fillStyle = "#48F67F";
        ctx.fill();
        ctx.closePath();
    }

    logic(eventsMap, cvsWidth, cvsHeight) {
        const that = this;
        this._logicBuffs();

        this.centerY = this.yPos + this.ySize/2;
        this.centerX = this.xPos + this.xSize/2;
        // console.log(eventsMap['mouseX'], eventsMap['mouseY'])

        // this.teta = this.myMath.getTeta(this.centerX, this.centerY, eventsMap['mouseX'], eventsMap['mouseY']);
        // console.log('this.teta',this.teta);
        


        if(eventsMap['right']) {
            this.xPrev = this.xPos;
            this.xPos += this.velocity;
        } else if(eventsMap['left']) {
            this.xPrev = this.xPos;
            this.xPos -= this.velocity;
        }

        if(eventsMap['up']) {
            this.yPrev = this.yPos;
            this.yPos -= this.velocity;
        } else if(eventsMap['down']) {
            this.yPrev = this.yPos;
            this.yPos += this.velocity;
        }

        if (this.xPos <= 0 || this.xPos >= cvsWidth || this.yPos <= 0 || this.yPos >= cvsHeight) {
            this.interact();
        }
    }

    interact(name) {
        console.log(name);
        if (name !== 'adv') {
            this.xPos = this.xPrev;
            this.yPos = this.yPrev;
        } else { 
            console.log('minus 20')
            this.hp -= 95;
        }
    }

    _addHp(hp) {
        if (this.hp + hp >= this.hpCapacity) {
            this.hp = this.hpCapacity;
        } else {
            this.hp += hp;
        }
    }

    _logicBuffs() {
        let buffs = this.buffs;
        this.buffs = [];
        // // console.log(buffs);
        buffs.forEach((buff) => {
            if (Date.now() - buff.startTime < buff.buff.time) {
                this.buffs[this.buffs.length] = buff;
            } else {
                if (buff.buff.name == 'increaseHpCapacity') {
                    this.hpCapacity = buff.buff.value;
                    if (this.hp > this.hpCapacity) {
                        this.hp = this.hpCapacity;
                    }
                } else if (buff.buff.name == 'increaseVelocity') {
                    this.velocity -= buff.buff.value;
                }
            }
        });
    }

    addBuff(person, buff) {
        if (buff.isTemporary) {
            this.buffs[this.buffs.length] = {
                buff: buff,
                startTime: Date.now(),
            }
            switch (buff.name) {
                case 'increaseHpCapacity':
                    // eslint-disable-next-line no-case-declarations
                    let prevHpCapacity = this.hpCapacity;
                    person.hpCapacity = this.hpCapacity;
                    person.hp *= (1 + this.hpCapacity / prevHpCapacity);
                    break;
                case 'increaseVelocity':
                    person.velocity += buff.value;
                    // console.log(person.velocity);
                    break;
            }
        } else {
            switch (buff.name) {
                case 'health':
                    this._addHp(buff.value);
                    break;
            }
        }
    }
}