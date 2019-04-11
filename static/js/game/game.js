import Screen from './functions/Screen.js'

import CollisionHandler from './functions/collisionHandler.js';
import KeyboardControl from './functions/KeyboardControl.js'
import Player from './dynamic/Player.js';
import DynamicEssence from './dynamic/DynamicEssence.js';
import Buff from './static/Buff.js';
import Barrier from './static/Barrier.js'

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
        this._screen.createCanvas();

        // Очко)
        this.score;

        // Массив объектов
        this.objects = {};

        this.CollisionHandler = new CollisionHandler();
<<<<<<< HEAD

        this._spawnBarriers();
        
        this._player = new DynamicEssence(
            300, 300,
=======
        this._player = new Player(
            10, 10,
>>>>>>> origin/newsick
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

        this.objects['players'] = [];
        this.objects['buffers'] = [];

        this.objects['players'].push(this._player)
        this.objects['buffers'].push(this._buff);

        // Рисуем канвас
    }

    _spawnBarriers() {
        this.objects['barriers'] = [];
        const that = this;
        for(let i = 0; i < 9; i++) {
            let xPos = Math.floor( Math.random() * 1300 );
            let yPos = Math.floor( Math.random() * 1100 );

            let xSize =  Math.floor(  Math.random() * (300 - 200) + 200 );
            let ySize =  Math.floor(  Math.random() * (220 - 130) + 170 );

            // if (i > 0) {
            //     while (i != 0) {
            //         if (xPos >= that.objects['barriers'][i-1].xPos && xPos <= (that.objects['barriers'][i-1].xPos + that.objects['barriers'][i-1].xSize) && 
            //         yPos >= that.objects['barriers'][i-1].yPos && yPos <= ( that.objects['barriers'][i-1].yPos +that.objects['barriers'][i-1].ySize ) )  {
            //             xPos = Math.floor( Math.random() * 1300 );
            //             yPos = Math.floor( Math.random() * 1100 );

            //             i--;
                        
            //         } else {
            //             i--;
            //         }
            //     }
            // }

            let barrier = new Barrier(xPos, yPos, xSize, ySize);

            this.objects['barriers'].push(barrier);
            console.log(i);
        }
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

<<<<<<< HEAD
        // console.log(this.CollisionHandler.getPairCollisions(
        //     players, buffs
        // ));
=======
        let pairs = this.CollisionHandler.getPairCollisions(
            players, buffs
        );

        pairs.forEach((pair) => {
            pair.second.interact(pair.first, pair.second);
        });
>>>>>>> origin/newsick

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