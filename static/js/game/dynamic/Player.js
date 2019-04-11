import KeyboardControl from '../functions/KeyboardControl.js'

import DynamicEssence from "./DynamicEssence.js";

export default class Player extends DynamicEssence {
    
    constructor(
        // xPos,
        // yPos,

        // xSize = 50,
        // ySize = 50,
        // URL = "/default_texture",
        // velocity = 100,

    ) {
        super(...arguments);
        this.keyHandler = new KeyboardControl();

        this.defaultVelocity = this.velocity;
        this.buffs = [];

        // // Основные параметры
        // this.hp = 100; // %
        // this.hpCapacity = 100; // у.е
        // this.velocity = velocity; // у.е

        // // Координаты
        // this.xPos = xPos;
        // this.yPos = yPos;

        // // Позиция прицела - только у плеера
        // this.xAim = 0;
        // this.yAim = 0;

        // // Его размеры 
        // this.xSize = xSize; // vh
        // this.ySize = ySize; // vh

        // // Тип оружия - только для usera 
        // this.melle = true;
        // this.gunId = 0; // 0 - knife

        // // Бафы - только для usera 
        // this.bufs = {} // "key" : {}

        // // Шмот
        // this.skinId = 0; // для игрока
        // this.texture = URL; // URL 
    }

    _render() {

    }

    // Логика перемещения только для рекламы 
    logic() {
        this._logicBuffs();

        let keys = this.keyHandler.handleKey();
        if(keys['right']) {
            this.xPos += this.velocity;
        }
        if(keys['left']) {
            this.xPos -= this.velocity;
        }
        if(keys['up']) {
            this.yPos -= this.velocity;
        }
        if(keys['down']) {
            this.yPos += this.velocity;
        }
    }

    interact() {

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
        console.log(buffs);
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
                    console.log(person.velocity);
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