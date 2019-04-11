import Screen from './functions/Screen.js'

import CollisionHandler from './functions/collisionHandler.js';
import KeyboardControl from './functions/KeyboardControl.js'
import Player from './dynamic/Player.js';
import DynamicEssence from './dynamic/DynamicEssence.js';
import Buff from './static/Buff.js';

export default class Game {
    constructor( 
        root = document.body,
        router
    ) {
        this.router = router;

        // Родительский узел DOM 
        this._root = root;

        // Игровой экран
        this._screen = new Screen(this.root);

        // Очко)
        this.score;

        // Массив объектов
        this.objects = [];

        this.CollisionHandler = new CollisionHandler();
        this._player = new DynamicEssence(
            10, 10,
            20, 20,
            "none",
            5
        );

        this._player.logic();
        this._buff = new Buff(
            100, 10,
            20, 20,
            "none"
        )

        // this._keyControll = new KeyboardControl;

        this.objects.push(this._player);
        this.objects.push(this._buff);

        // Рисуем канвас
        this._screen.createCanvas();
    }

    defeat() {
        router.go('/defeat');
    }

    victory() {
        router.go('/win');
    }

    frame() {
        let players = [this._player];
        let buffs = [this._buff];

        console.log(this.CollisionHandler.getPairCollisions(
            players, buffs
        ));

        this._player.logic();
        this._screen.render(this.objects);

        requestAnimationFrame(time => this.frame());
    }

    // Инит метод : цикл -> отрисовка 
    run() {
        this._screen.createCanvas();
        requestAnimationFrame(time => this.frame());
    }


}  