import BaseView from './View.js';

import ShopComponent from '../components/ShopComponent/ShopComponent.js';

// const { NetworkHandler } = window;

export default class SignupView{
    constructor(
        root,
        weapons
    ) {
        this.root = root;
        this.weapons = weapons;
        this.ShopComponent = new ShopComponent(this.root, this.weapons);

        document.addEventListener('click', (event) => {
            if  (event.target.className !== 'shop__menu-item') {
                return;
            } 

            console.log(event.target.dataset.section);
            this.weapon(event.target.dataset.section);
        })
    }

    show() {
        this.ShopComponent.render();
    }

    weapon(weapon) {
        this.ShopComponent.renderWeaponInfo(weapon)
    }

    hide() {
        this.root.innerHTML = '';
    }
}