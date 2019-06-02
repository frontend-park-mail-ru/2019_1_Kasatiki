import BaseView from './View.js';

import Game from '../game/game.js';

export default class GameView extends BaseView {
    constructor() {
        super(...arguments);
        this.game = new Game;
    }

    show() {
        this.root.innerHTML = `<canvas class="game"></canvas>
                               <button class="game-back" href="/"></back>`;
        this.game.gameStart();
    }

}