import MpSpChose from '../components/MpSpChose/MpSpChose.js'
import BaseView from './View.js';

const { NetworkHandler } = window;

export default class MpSpChoseView extends BaseView {
    constructor() {
        super(...arguments);
        this.MpSpChose = new MpSpChose();
    }

    show() {
        const that = this
        NetworkHandler.doGet({
            callback(isAuth) {
                console.log("Status in CHOSE MODE", isAuth)
                that.root.innerHTML = that.MpSpChose.render(isAuth);
            },
            path: '/api/isauth',
        });
    }
}