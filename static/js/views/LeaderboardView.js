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
        let offset = 1;
        if (urlData.search !== '') {
            offset = this._getURLParams(urlData.search)[ 'offset' ];
        }
        console.log("OFFFFFSET: ", offset);
        NetworkHandler.doGet({
			callback(data) {
                that.LeaderboardComponent._usersArr = data;
				that.LeaderboardComponent.render(offset);
			},
			path: '/api/leaderboard?offset=' + offset,
		});
    }

    _getURLParams(url) {
        let urlParams = {};
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) {
                urlParams[$1] = $3;
            }
        );
        return urlParams;
      }

    initSpecialRoutes() {

    }
}