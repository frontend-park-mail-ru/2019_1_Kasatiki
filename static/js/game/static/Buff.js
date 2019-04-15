import StaticEssence from './StaticEssence.js';

import buffConfigs from '../configs/buffConfigs.js';

export default class Buff extends StaticEssence {
    constructor(buff) {
        super(...arguments);
        this.buff = buffConfigs.increaseVelocity;
        this.visited = false;
    }

    _render(canvasContext) {
        canvasContext.fillRect(
            this.xPos,
            this.yPos,
            this.xSize,
            this.ySize);
    }

    interact(person, buffObj) {
        if (!buffObj.visited) {
            console.log(buffObj.visited);
            person.addBuff(person, buffObj.buff);
            buffObj.visited = true;
        }
    }
}