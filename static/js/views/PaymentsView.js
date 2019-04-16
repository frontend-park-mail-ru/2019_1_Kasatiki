import BaseView from './View.js';

import PaymentsComponent from '../components/PaymentsComponent/PaymentsComponents.js'

const { NetworkHandler } = window;

export default class PaymentsView extends BaseView {
    constructor() {
        super(...arguments);
        this.PaymentsComponent = new PaymentsComponent();
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            callback(data) {
                console.log('data',data);
                if (typeof(data) === 'object') {
                    console.log("IM IN",data.status);
                    that.root.innerHTML = that.PaymentsComponent.render(true);
                }
            },
            path: '/api/isauth',
        });
    }
}