import StaticEssence from "./StaticEssence.js";

export default class Shop extends StaticEssence{
    constructor() {
        super(...arguments)
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
        ctx.fillStyle = "#C733FF";
        ctx.fill();
        ctx.closePath();
    }

    logic() {

    }

    interact() {

    }
}