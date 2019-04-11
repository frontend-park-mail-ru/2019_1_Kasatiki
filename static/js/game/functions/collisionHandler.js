export default class CollisionHandler {
    /**
     * Функция возвращает массив пар {first: firstObj, second: secondObj}
     * @param {Array of } firstArr 
     * @param {Array of } secondArr 
     */
    getPairCollisions(firstArr, secondArr) {
        let pairs = [];
        firstArr.forEach(firstObj => {
            if (typeof firstObj !== 'undefined') {
                secondArr.forEach(secondObj => {
                    if (typeof secondObj !== 'undefined') {
                        if (this._checkCollision(firstObj, secondObj)) {
                            pairs[pairs.length] = {
                                first: firstObj,
                                second: secondObj,
                            };
                        }
                    }
                });
            }
        });
        return pairs;
    }

    /**
     * 
     * @param {Array of Array} map 
     * @param {Array} objArray 
     */
    _setObjectsVisibilityArea(map, objArray) {

    }
 
    _checkCollision(obj1, obj2) {
        return this._checkCollisionRectangles(obj1, obj2);
    }

    _checkCollisionRectangles(obj1, obj2) {
        if (Math.abs(obj1.xPos - obj2.xPos) <= obj1.xSize + obj2.xSize &&
            Math.abs(obj1.yPos - obj2.yPos) <= obj1.ySize + obj2.ySize) {
            return true;
        }
        return false;
    }

    _checkCollisionCirles(obj1, obj2) {

    }

    _checkCollisionRectangleCirle(rect, cirle) {

    }
}

class increaseHpByTime {
    constructor() {
        this.start = Date.now();
    }

    start() {
        this.start = Date.now();
    }

    end(person) {
        person.hp = person.hp + Math.trunc((Date.now() - this.start) / 100);
        if (person.hp > person.hpCapacity) {
            person.hp = person.hpCapacity;
        }
    }
}