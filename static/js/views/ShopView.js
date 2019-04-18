import BaseView from './View.js';

import ShopComponent from '../components/ShopComponent/ShopComponent.js';

// const { NetworkHandler } = window;

export default class SignupView extends BaseView {
    constructor() {
        super(...arguments);
        this.ShopComponent = new ShopComponent();
    }

    show() {
        const shop = document.querySelector('.shop');
    }
}