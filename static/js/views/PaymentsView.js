import BaseView from './View.js';

import PaymentsComponent from '../components/PaymentsComponent/PaymentsComponents.js'
import Validation from '../modules/Validation.js';

const { NetworkHandler } = window;

export default class PaymentsView extends BaseView {
    constructor() {
        super(...arguments);
        this.validation = new Validation();
        this.PaymentsComponent = new PaymentsComponent();
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            callback(data) {
                console.log('data',data);
                if (typeof(data) === 'object') {
                    that.root.innerHTML = that.PaymentsComponent.render(true);
                } else {
                    that.root.innerHTML = that.PaymentsComponent.render(true);
                }
                that.initSpecialRoutes();
            },
            path: '/api/isauth',
        });
    }

    initSpecialRoutes() {
        this.specialRoutes['/payout'] = this._send;
    }

    _send(that) {
        const form = document.querySelector('.payments__input-section');
        const errSection = document.querySelector('.payments__input-section-error-section'); 
        const statusSection = document.querySelector('.payments__status-section-container');

        console.log('NUMBER:', form.phone.value);
        let err = that.validation.checkPhone(form.phone.value);

        if (err != undefined) {
            that._panicError(errSection, err)
            return
        }

        err = that.validation.checkAmount(form.amount.value);

        if (err != undefined) {
            that._panicError(errSection, err)
            return
        }

        let payload = {
            phone : form.phone.value,
            amount : form.amount.value,
        }

        NetworkHandler.doPost({
            callback(data) {
                if (data.status === 201) {
                    let status = document.createElement('div');
                    status.className = 'payments__status-section-element-ok';
                    status.innerText = 'Success payment';
                    statusSection.appendChild(status);
                    setTimeout(() => {
                        statusSection.children[0].remove();
                    }, 3000);
                } else {
                    let status = document.createElement('div');
                    status.className = 'payments__status-section-element-fail';
                    status.innerText = 'Failed payment';
                    statusSection.appendChild(status);
                    setTimeout(() => {
                        statusSection.children[0].remove();
                    }, 3000);
                }
            },
            path: '/api/payments',
            body: JSON.stringify( payload ),
        });
    }

    _panicError(errSection, errMes) {
        errSection.innerText = errMes;
    }
}