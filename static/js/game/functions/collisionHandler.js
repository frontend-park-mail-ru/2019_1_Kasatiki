export default class CollisionHandler {
    /**
     * Функция возвращает массив пар {first: firstObj, second: secondObj}
     * @param {Array of } firstArr 
     * @param {Array of } secondArr 
     */
    _getPairCollisions(firstArr, secondArr) {
        let pairs = [];
        firstArr.forEach((firstObj, fidx) => {
            if (typeof firstObj !== 'undefined') {
                secondArr.forEach((secondObj, sidx) => {
                    if (typeof secondObj !== 'undefined') {
                        if (this._checkCollision(firstObj, secondObj)) {
                            pairs = {
                                first: {firstObj, fidx},
                                second: {secondObj, sidx}
                            };
                        }
                    } else {
                    }
                });
            }
        });
        return pairs;
    }

    handleCollisions(objects) {
        let PlayerBarrierCollision = this._getPairCollisions(objects['players'], objects['barriers']);
        let BulletBarrierCollision = this._getPairCollisions(objects['bullets'], objects['barriers']);
        let BulletAdvsCollision = this._getPairCollisions(objects['bullets'], objects['advs']);
        let PlayersAdvsCollision = this._getPairCollisions(objects['players'], objects['advs']);
        let AdvBarrierCollision = this._getPairCollisions(objects['barriers'], objects['advs']);

        if (PlayerBarrierCollision.length != 0) {
            PlayerBarrierCollision.first.firstObj.interact();
            PlayerBarrierCollision.second.secondObj.interact();                
        }

        if (BulletBarrierCollision.length != 0) {
            BulletBarrierCollision.first.firstObj.interact();
            objects['bullets'].splice(BulletBarrierCollision.first.fidx, 1);
            BulletBarrierCollision.second.secondObj.interact();
        }

        if (BulletAdvsCollision.length != 0) {
            BulletAdvsCollision.first.firstObj.interact();
            objects['bullets'].splice(BulletAdvsCollision.first.fidx, 1);
            let advHealth = BulletAdvsCollision.second.secondObj.interact(BulletAdvsCollision.first.firstObj);
            if (advHealth <= 0) {
                objects.score += 100;
                objects['advs'].splice(BulletAdvsCollision.second.sidx, 1);
            }                
        }


        if (PlayersAdvsCollision.length != 0) {
            PlayersAdvsCollision.first.firstObj.interact('adv');
            let advHealth = PlayersAdvsCollision.second.secondObj.interact(PlayersAdvsCollision.first.firstObj);
            if (advHealth <= 0) {
                objects.score += 100;
                objects['advs'].splice(PlayersAdvsCollision.second.sidx, 1);
            }                
        }

        if (AdvBarrierCollision.length != 0) {
            AdvBarrierCollision.first.firstObj.interact();
            AdvBarrierCollision.second.secondObj.interact(AdvBarrierCollision.first.firstObj);            
        }

        // if (PlayersAdvsCollision.length != 0) {
        //     PlayerBarrierCollision.first.firstObj.interact();
        //     PlayerBarrierCollision.second.interact();                
        // }
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
        let x1 = obj1.xPos;
        let y1 = obj1.yPos;
        let xd1 = obj1.xPos + obj1.xSize;
        let yd1 = obj1.yPos + obj1.ySize;

        let x2 = obj2.xPos;
        let y2 = obj2.yPos;
        let xd2 = obj2.xPos + obj2.xSize;
        let yd2 = obj2.yPos + obj2.ySize;

        let left = Math.min(x1, x2);
        let right = Math.max(xd1, xd2);
        let top = Math.min(y1, y2);
        let bottom = Math.max(yd1, yd2);

        let width = right - left;
        let height = bottom - top;

        if (width <= obj1.xSize + obj2.xSize && height <= obj1.ySize + obj2.ySize) {
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