import BaseView from './View.js';

import LeaderboardComponent from '../components/LeaderboardComponent/LeaderboardComponent.js';

const { NetworkHandler } = window;

/**
 * Класс с отрисовкой формы логина.
 */
export default class LeaderboardView extends BaseView {
    constructor() {
        super(...arguments);
        this.LeaderboardComponent = new LeaderboardComponent();
        this.initSpecialRoutes();
    }

    show(urlData) {
        const that = this;
        let offset = '?offset=1';
        if (urlData.search !== '') {
            offset = urlData.search;
        }
        console.log("OFFFFFSET: ", offset);
        NetworkHandler.doGet({
			callback(data) {
                that.LeaderboardComponent._usersArr = data;
                console.log(data);
				that.LeaderboardComponent.render();
			},
			path: '/api/leaderboard' + offset,
		});
    }

    initSpecialRoutes() {

    }
}