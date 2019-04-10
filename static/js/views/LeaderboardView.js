import BaseView from './View.js';

import LeaderboardComponent from '../components/LeaderboardComponent/LeaderboardComponent.js';

// const { NetworkHandler } = window;

/**
 * Класс с отрисовкой формы логина.
 */
export default class LoginView extends BaseView {
    constructor() {
        super(...arguments);
        this.LeaderboardComponent = new LeaderboardComponent();
        this.initSpecialRoutes();
    }

    show() {

    }

    initSpecialRoutes() {

    }
}