import KeyboardControl from '../functions/KeyboardControl.js'
import MyMath from '../functions/myMath.js';

export default class DynamicEssence {
    
    constructor(
        xPos,
        yPos,

        xSize = 50,
        ySize = 50,
        URL = "/default_texture",
        velocity = 100,
    ) {
        this.keyHandler = new KeyboardControl();
        this.myMath = new MyMath();

        // Основные параметры
        this.hp = 100; // %
        this.hpCapacity = 100; // у.е
        this.velocity = velocity; // у.е

        // Координаты
        this.xPos = xPos;
        this.yPos = yPos;

        // Позиция прицела - только у плеера
        this.xAim = 0;
        this.yAim = 0;

        // Его размеры 
        this.xSize = xSize; // vh
        this.ySize = ySize; // vh

        this.teta = 0;

        // Тип оружия - только для usera 
        // this.melle = true;
        // this.gunId = 0; // 0 - knife

        // Бафы - только для usera 
        // this.bufs = {} // "key" : {}

        // Шмот
        // this.skinId = 0; // для игрока
        this.texture = URL; // URL 

        // this.immortal = false; // для рекламы
    }

    // Логика перемещения только для рекламы 
    logic(screenWidth, screenHeight) {
        let keys = this.keyHandler.handleKey();
        let y = this.yPos + this.ySize/2;
        let x = this.xPos + this.xSize/2;
        this.teta = this.myMath.get0toCor(x, y, keys['mouseX'], keys['mouseY']);

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


        // if (this.xPos < 0) {
        //     this.xPos = canvas.width;
        // }
        // else if (this.xPos > canvas.width)
        //     this.xPos = 0;

        // if (this.yPos < 0) {
        //     this.yPos = canvas.height;
        // }
        // else if (this.yPos > canvas.height) 
        //     this.yPos = 0;
    }

    interact() {

    }
}