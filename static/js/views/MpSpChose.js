import MpSpChose from '../components/MpSpChase/MpSpChose.js'
import BaseView from './View.js';

export default class MpSpChoseView extends BaseView {
    constructor() {
        super(...arguments);
    }

    show() {
        NetworkHandler.doGet({
            callback(isAuth) {
                console.log("Status in CHOSE MODE", isAuth)
                that.root.innerHTML = that.PaymentsComponent.render(isAuth);
            },
            path: '/api/isauth',
        });
    }
}