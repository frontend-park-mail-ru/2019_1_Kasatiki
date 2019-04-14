import BaseView from './View.js';

import SignupComponent from '../components/SignupComponent/SignupComponent.js';
import Validation from '../modules/Validation.js';

const { NetworkHandler } = window;

export default class SignupView extends BaseView {
    constructor() {
        super(...arguments);
        this.Validation = new Validation();
        this.SignupComponent = new SignupComponent();
        this.initSpecialRoutes();
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            // eslint-disable-next-line no-unused-vars
            callback(data) {
                let isAuth = data['is_auth'];
                that.root.innerHTML = that.SignupComponent.render(isAuth);
                let form = document.querySelector('#signup-form');
                that.SignupComponent.setOnChangeListener(form.nickname);
                that.SignupComponent.setOnChangeListener(form.email);
                that.SignupComponent.setOnChangeListener(form.password);
                that.SignupComponent.setOnChangeListener(form.password_repeat);                
            },
            path: '/api/isauth',
        });
    }
    
    initSpecialRoutes() {
        this.specialRoutes['/signupuser'] = this.signupUser;
    }

    signupUser(that) {
        let form = document.querySelector('#signup-form');

        let isValid = that.validateValue(form.nickname, that.Validation.checkNickname, that.SignupComponent);
        if (!isValid) {
            return;
        }
        isValid = that.validateValue(form.email, that.Validation.checkEmail, that.SignupComponent);
        if (!isValid) {
            return;
        }
        isValid = that.validateValue(form.password, that.Validation.checkPassword, that.SignupComponent);
        if (!isValid) {
            return;
        }
        if (form.password.value !== form.password_repeat.value) {
            that.SignupComponent.setErrorText('Passwords do not match');
            return
        }
        

        const payload = {
            nickname : form.nickname.value,
            email    : form.email.value,
            password : form.password.value,
        }

        console.log(payload);
        NetworkHandler.doPost({
            callback(data) {
                if (typeof data.Error === 'undefined') {
                    console.log ('OK answer');
                    // console.log('data in signup:', data);
                    // that.router.hankdle('profile', data);
                    that.router.go('/');
                } else {
                    console.log("ERROR");
                    that.SignupComponent.setErrorText(data.Error);
                }
            },
            path: '/api/signup',
            body: JSON.stringify( payload ),
        });
    }

    /**
     * Функциия, проверяющая на валидность поле input.
     * Если поле не валидное, то вызывает метод errorField, которое подсвечивает поле.
     * Если все ок - убирает подсветку.
     * @param {HTMLelement} input
     * @param {function} validationFunc 
     * @param {Object} SignupComponent 
     */
    validateValue(input, validationFunc, SignupComponent) {
        let validationMessage = validationFunc(input.value);
        if (validationMessage.localeCompare('OK') !== 0) {
            SignupComponent.setErrorText(validationMessage);
            SignupComponent.errorField(input);
            return false;
        }
        SignupComponent.goodField(input);
        return true;
    }
}