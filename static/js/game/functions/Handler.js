import ObjectShape from '../configs/config.js'

export default class Handler {

    constructor() {
        this.objects;
        this.initEmptyField();

        this.KkeyMap = {
            'up' : false,
        }
    }

    initEmptyField() {
        this.objects = {};
    }

    listenKeys() {
        
    }

    addObject(name, obj) {
        this.objects[name]  = obj;
    }

    // sendKeys
}

