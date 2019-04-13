export default class MyMath {
    constructor() {}

    getTeta(x, y, mouseX, mouseY)
    {
        let a = mouseX - x;
        let b = mouseY - y;
        
        return 90/57.3 - Math.atan(a/b);
    }
}