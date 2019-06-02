import BaseView from './View.js';

import EndComponent from '../components/EndComponents/endComponent.js';
/**
 * Класс с отрисовкой формы логина.
 */
export default class EndView extends BaseView {
    constructor() {
        super(...arguments);
        this.endViewComp = new EndComponent();
    }

    show(score) {
        this.endViewComp.render(score);
    }
}