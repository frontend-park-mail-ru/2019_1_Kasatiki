export default class CountdownComponent {
    constructor(
        handler,
		parentElement = document.body,
    ) {
        this._handler = handler;
		this._parentElement = parentElement;        

        // ПРИНЦИП РАБОТЫ:
        // Тик: 60 тиков в секунду. Каждый тик перемещается цифра.
        // Каждые 60 тиков меняется цифра и вспомогательный текст.
        this.tickNumber = 1;
        this.maxTickNumber = 60;

        // this.initXPosition = parseFloat(window.getComputedStyle(digit, null).getPropertyValue('margin-left'));
        // 
        this.initXPosition = -4.3;  // em
        this.initYPosition = -3;  // em

        // Время, через которое одна цифра будет заменена другой.
        this.timeout = 1000;

        // Текст, который выводится вместе с цифрами.
        this.supportingText = {
            3: '| Hate ****** ads?',
            2: '| Wanna destroy it?',
            1: "| Let's hate with us!",
        };
    }

    /**
     * Высчитывает X координату в зависимости от номера тика. (0 < tickNumber < maxTickNumber = 60).
     * Пол секунды всплывает, пол секунды стоит на месте.
     */
    _calculateXCoordinate() {
        if (this.tickNumber <= this.maxTickNumber / 2) {
            return this.initXPosition * (this.maxTickNumber - 2 * this.tickNumber) / this.maxTickNumber - 0.6 + 'em';
        }

        return '-0.6em';
    }

    /**
     * Высчитывает Y координату в зависимости от номера тика. (0 < tickNumber < maxTickNumber = 60).
     * Пол секунды всплывает, пол секунды стоит на месте.
     */
    _calculateYCoordinate() {
        if (this.tickNumber <= this.maxTickNumber / 2) {
            return this.initYPosition * (this.maxTickNumber - 2 * this.tickNumber) / this.maxTickNumber - 0.625 + 'em';
        }

        return '-0.625em';
    }

    /**
     * Принтит последнее всплывающее окно: ('GO'!)
     */
    _printFinalScreen(digitDOM) {
        digitDOM.style.marginLeft = '-0.725em';

        let countdown = setInterval((function() {
            digitDOM.style.marginTop = this._calculateYCoordinate();
            // digitDOM.textContent = 'GO!';
            digitDOM.textContent = `
                Тут должна быть игра, но пока ее нету :^(\n
                чтобы эмулировать завершение игры, нажмите\n
                клавишу Space на клавиатуре
            `;

            this.tickNumber = this.tickNumber + 1;
        }).bind(this), 1000 / this.maxTickNumber);

        setTimeout((function() {
            clearInterval(countdown);
        }).bind(this), 1000);
    }

    /**
     * Рисует анимацию движения цифры и вспомогательного текста (рекурсивная)
     * @param {integer} count - цицра, которая будет выводиться на экран.
     * @param {*} digitDOM - Элемент дом дерева, которая будет содержать цифру.
     * @param {*} supportingTextDOM - Элемент дом дерева, куда будет выводиться вспомогательный текст.
     */
    _print(count, digitDOM, supportingTextDOM) {
        console.log(digitDOM, supportingTextDOM);
        if (typeof count === 'undefined' && typeof count !== 'number') {
            count = 3;
        }

        if (count === 0) {
            this._printFinalScreen(digitDOM, supportingTextDOM);
            return;
        }
        
        if (count <= 3 && count > 0) {
            supportingTextDOM.textContent = this.supportingText[count];
        }

        digitDOM.style.marginLeft = this._calculateXCoordinate();
        digitDOM.textContent = String(count);

        let countdown = setInterval((function() {
            digitDOM.style.marginLeft = this._calculateXCoordinate();

            this.tickNumber = this.tickNumber + 1;
        }).bind(this), 1000 / this.maxTickNumber);

        setTimeout((function() {
            clearInterval(countdown);
            this.tickNumber = 0;

            if (count > 0) {
                digitDOM.textContent = '';
                supportingTextDOM.textContent = '';
                this._print(count - 1, digitDOM, supportingTextDOM);
            }
        }).bind(this), 1000);    
    }

    _render() {
        const templateScript = `
            <div class="timer-digit" id="timer-digit">3</div>
            <div class="supporting-text" id="supporting-text">a</div>
            `
        const template = Handlebars.compile(templateScript);
        this._parentElement.innerHTML = template();
    }

    run() {
        this._render();
        let digitDOM = document.querySelector('.timer-digit');
        let supportingTextDOM = document.querySelector('.supporting-text');
        console.log("supp:",supportingTextDOM);
        this._print(3, digitDOM, supportingTextDOM);
        const that = this;
        addEventListener('keypress', (evt) => {
            if (evt.keyCode == 32)  {
                that._handler.handle('chose');
            }
        })

        

        // this._eventHandler.handle('menu');

        // setTimeout((function() {
        // }).bind(this), 3000);
    }
}