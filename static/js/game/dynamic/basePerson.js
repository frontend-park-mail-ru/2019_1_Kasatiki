export default class DynamicEssence {
    
    constructor(
        xPos,
        yPos,

        xSize = 50,
        ySize = 50,
        URL = "/default_texture",
        velocity = 100,
    ) {
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

        // Тип оружия - только для usera 
        // this.melle = true;
        // this.gunId = 0; // 0 - knife

        // Бафы - только для usera 
        // this.bufs = {} // "key" : {}

        // Шмот
        // this.skinId = 0; // для игрока
        this.texture = URL; // URL 

        this.immortal = false; // для рекламы
    }

    _render() {

    };

    // Логика перемещения только для рекламы 
    logic() {

    } 

    interact() {

    }
}