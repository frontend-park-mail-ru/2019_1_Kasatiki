export default class CollisionHandler {
    /**
     * 
     * @param {Array} persons 
     * @param {Array} advs 
     * @param {Array} bullets 
     * @param {Array} statics 
     * @param {Array of Array} map - карта для области видимости.
     */
    checkAllCollisions(
        persons = {},
        advs = {},
        bullets = {},
        statics = {},
        map = {},
    ) {
    }




    checkCollision(obj1, obj2) {
        return this.collisionRectangles(obj1, obj2);
    }

    checkCollisionRectangles(obj1, obj2) {
        if (Math.abs(obj1.xPos - obj2.xPos) < obj1.xSize + obj2.xSize &&
            Math.abs(obj1.yPos - obj2.yPos) < obj1.ySize + obj2.ySize) {
            return true;
        }
        return false;
    }

    checkCollisionCirles(obj1, obj2) {

    }

    checkCollisionRectangleCirle(rect, cirle) {

    }
}
