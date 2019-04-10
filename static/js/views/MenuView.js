import BaseView from './View.js';

import MenuComponent from '../components/MenuComponent/MenuComponent.js';

const { NetworkHandler } = window;

export default class MenuView extends BaseView {
    constructor() {
        super(...arguments);
        this.MenuComponent = new MenuComponent();
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            // eslint-disable-next-line no-unused-vars
            callback(data) {
                console.log(data['is_auth']);
                let isAuth = data['is_auth'];
                that.root.innerHTML = that.MenuComponent.render(isAuth);
            },
            path: '/isauth',
        });
    }
}