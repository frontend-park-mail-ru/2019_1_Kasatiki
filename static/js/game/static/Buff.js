import StaticEssence from './StaticEssence.js';

import buffConfigs from '../configs/buffConfigs.js';

export default class Buff extends StaticEssence {
    constructor(buff) {
        super(...arguments);
        this.buff = buff;
    }

    _render(canvasContext) {
        canvasContext.fillRect(
            this.xPos,
            this.yPos,
            this.xSize,
            this.ySize);
    }

    interact() {
    }
}