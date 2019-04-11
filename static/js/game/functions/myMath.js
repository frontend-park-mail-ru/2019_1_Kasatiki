export default class MyMath {
    constructor() {}

    get0toCor(x, y, mouseX, mouseY)
    {
        let a = mouseX - x;
        let b = mouseY - y;
        
        console.log(mouseX, mouseY)

        let alfa;
        if (a > b) {
            alfa =90/57.3 - Math.atan(a/b);
        } else {
            alfa = Math.atan(a / b);
        }
        return alfa;
    }
}