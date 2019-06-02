import BaseView from './View.js';

import MenuComponent from '../components/MenuComponent/MenuComponent.js';

const { NetworkHandler } = window;

export default class MenuView extends BaseView {
    constructor() {
        super(...arguments);
        this.MenuComponent = new MenuComponent();
    }

    _renderMenu(data) {
        this.root.innerHTML = this.MenuComponent.render(data);

        const profileSection = document.querySelector('.menu__profile');
        const buttonsSection = document.getElementById('menu__profile-buttons-section');
        profileSection.addEventListener('mouseover', showButtons, false);
        profileSection.addEventListener('mouseout', hideButtons, false);

        function showButtons(e) {
            // console.log('on');
            console.log();
            buttonsSection.style.display = 'flex';
        }

        function hideButtons(e) {
            buttonsSection.style.display = 'none';
        }
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            // eslint-disable-next-line no-unused-vars
            callback(data) {
                let permissionsObj = navigator.permissions.query({name:'geolocation'})
                .then(function(result) {
                    if (result.state === 'granted') {
                      showMap();
                    } else if (result.state === 'prompt') {
                      showButtonToEnableMap();
                    }
                });
                console.log('menu view', permissionsObj);
                // alert(per.get_value());
                if (typeof(data) == 'object') {
                    that._renderMenu(data);
                } else {
                    that.root.innerHTML = that.MenuComponent.render(false);
                }   


            },
            path: '/api/isauth',
        });
    }
}