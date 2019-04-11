import Screen from './functions/Screen.js'

import KeyboardControl from './functions/KeyboardControl.js'
import Player from './dynamic/Player.js';
import DynamicEssence from './dynamic/DynamicEssence.js';

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


        this._player = new DynamicEssence(
            10, 10,
            20, 20,
            "none",
            5
        );

        this._player.logic();

        // this._keyControll = new KeyboardControl;

        this.objects.push(this._player);

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