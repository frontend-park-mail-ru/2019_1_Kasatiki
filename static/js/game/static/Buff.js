// Возможные бафы
export const buffs = {
    health: 1,
    increaseHpCapacity: 2,
    increaseVelocity: 3,
}


export default class Buff extends StaticEssence {
    constructor(buffId) {
        super(...arguments);
        this.buffId = buffId;
        this.initBuffs();
    }

    initBuffs() {
        this.hpBuff = 10;
        this.hpCapacityBuff = 10;
        this.velocityBuff = 10;
    }

    static get health() {
        return buffs.health;
    }

    static get increaseHpCapacity() {
        return buffs.increaseHpCapacity;
    }

    static get increaseVelocity() {
        return buffs.increaseVelocity;
    }

    _render(canvasContext) {
        canvasContext.fillRect(
            this.xPos,
            this.yPos,
            this.xSize,
            this.ySize);
    }

    interact(person) {
        switch (this.buffId) {
            case buffs.health:
                person.hp = person.hp + this.hpBuff;
                break;
            case buffs.increaseHpCapacity:
                person.hpCapacity = person.hpCapacity + this.hpCapacityBuff;
                // Увеличиваю хп пропорционально увеличению капасити
                person.hp = person.hpCapacity / (person.hpCapacity - this.hpCapacityBuff) * person.hp;
                break; 
            case buffs.increaseVelocity:
                person.velocity = person.velocity + this.velocityBuff;
                break;
        }
    }
}