// import StaticEssence from './StaticEssence.js'

export default class Barrier {
    constructor(   
        xPos,
        yPos,

        xSize = 250,
        ySize = 250,
        URL = "/default_texture",    
        ) {
       
        // Координаты
        this.xPos = xPos;
        this.yPos = yPos;

        // Позиция прицела - только у плеера

        // Его размеры 
        this.xSize = xSize; // vh
        this.ySize = ySize; // vh
    }

    logic() {}

}