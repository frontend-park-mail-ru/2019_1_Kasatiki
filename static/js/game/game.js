import Screen from './functions/Screen.js'

import CollisionHandler from './functions/collisionHandler.js';
import Player from './dynamic/Player.js';
import Buff from './static/Buff.js';
import Barrier from './static/Barrier.js'
import Handler from './functions/Handler.js'
import Bullet from './dynamic/bullet.js'
import Adv from './dynamic/Adv.js'
import Shop from './static/Shop.js';

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
        this.score = 0;

        this.scoreObj = {value : this.score};

        this.currentTime = 0;

        // Массив объектов
        this.eventsMap = {};

        this.objects = {
        };
        
        this._player = new Player(
            this._screen.width/2, this._screen.height/2,
            20, 20,
            "none",
            5
        );

        this._buff = new Buff(
            100, 10,
            20, 20,
            "none"
        )

        this.waveTrigger = true;
        this.wavePause = false;
        this.waveCount = 0;
        this.pauseTimer = 0;
        this.totalAdvSpawn = 0;
        this.currentAdvCount = 0;

        this.collisions = [];

        this.objects['players'] = [];
        this.objects['buffers'] = [];
        this.objects['bullets'] = [];
        this.objects['barriers'] = [];
        this.objects['advs'] = [];
        this.objects['shops'] = [];
        this._spawnBarriers(10);

        this.objects['players'].push(this._player)
        this.objects['buffers'].push(this._buff);

        this.canvas = this._screen.createCanvas();
        this.CollisionHandler = new CollisionHandler();
        this.handler = new Handler(this._screen._canvas);

        // Рисуем канвас
    }

    _spawnAdvs(count) {
        for (let i = 0; i < count; i++) {
            let vel = 3 * Math.random();
            let adv = new Adv(30, 450, 20, 20, 'none', vel);

            this.objects['advs'].push(adv);
        }
    }

    _spawnBarriers(count = 10) {
        const that = this;
        const xStep = this._screen.width/ count;
        const yStep = this._screen.height/ 3;
        console.log(xStep, yStep);
        for(let j = 0; j < 3; j++) {
            for (let i = 0; i < count; i++) {
                // if (!(j == 1 && i == 6) || !(j == 1 && i == 0) || !(j ==1 && i == 5) || !(j == 1 && i ==7)) {
                    let xPos = Math.floor( i * xStep + Math.random() * xStep );
                    let yPos = Math.floor( j * yStep + Math.random() * yStep );

                    let xSize =  Math.floor(  Math.random() * Math.abs((((i+1) * xStep - xPos) - ((i+1) * xStep - xPos) /2) + ((i+1) * xStep - xPos) /2 ));
                    let ySize =  Math.floor(  Math.random() * Math.abs((((j+1) * yStep - yPos) - ((j+1) * xStep - xPos) /2) + ((j+1) * xStep - xPos) /2 ));

                    let barrier = new Barrier(xPos, yPos, xSize, ySize);

                    this.objects['barriers'].push(barrier);
                // }
            }
        }
        // let barrier = new Barrier(200, 200, 300, 300);
        // this.objects['barriers'].push(barrier);
    }

    defeat() {
        this.router.go('/');
        throw new Error('Ok');
    }

    victory() {
        this.router.go('/win');
    }

    isEmpty(obj) {
        for (var key in obj) {
          return false;
        }
        return true;
      }

    frame() {
        this.eventsMap = this.handler.sendEventMap();

        if (this.waveTrigger) {
            this.totalAdvSpawn += 5;
            this.currentAdvCount = this.totalAdvSpawn;
            this.waveCount++;
            console.log(this.totalAdvSpawn)
            this._spawnAdvs(this.totalAdvSpawn);
        }

        this.waveTrigger = false;

        // Стрельба
        if (this.eventsMap['mouseClick']) {
            let bullet = new Bullet(
                this.objects['players'][0].centerX,
                this.objects['players'][0].centerY,
                2,2,'',
                7,
                this.eventsMap['mouseX'], this.eventsMap['mouseY']
            );
            this.objects['bullets'].push(bullet);
        }

        this.objects['bullets'].forEach(element => {
            element.go();
        });

        this.objects['players'][0].logic(this.eventsMap, this.width, this.height);
        this.objects['advs'].forEach(adv => {
            adv.logic(this.objects['players'][0].xPos, this.objects['players'][0].yPos);
        });

        this._screen.render(this.objects);

        this.CollisionHandler.handleCollisions(this.objects, this.scoreObj);

        this.currentTime++;

        if (this.currentTime >= 60) {
            this.currentTime = 0;
            this.score++;
            this.objects['players'][0].hp -= 0.5;
        }

        if (this.objects['advs'].length == 0 && !this.wavePause) {
            this.objects['players'][0].hp = 100;
            this.currentTime = 0;
            this.pauseTimer = 30 * 60;
            this.wavePause = true;
            let shop = new Shop(1200, 500, 100, 100);
            this.objects['shops'].push(shop);
        }

        if (this.wavePause) {
            this.currentTime = 0;
            this.pauseTimer -= 1;
            this._screen.showPauseTime(Math.floor(this.pauseTimer/60));
            if (this.pauseTimer == 0) {
                this.objects['shops'].splice(0,1);
                this.wavePause = false;
                this.waveTrigger = true;
            }
        }

        this._screen.showWaveNumber(this.waveCount); 
        this._screen.showInfo(this.score, this.objects['players'][0].hp);

        this.checkDeath();

        requestAnimationFrame(time => this.frame());
    }

    checkDeath() {
        if (this.objects.players[0].hp <= 0) {
            this.defeat();
        }
    }

    // Инит метод : цикл -> отрисовка 
    run() {
        requestAnimationFrame(time => this.frame());
    }


}  