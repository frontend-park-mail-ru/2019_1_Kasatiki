let letTickNumber = 1;

class PrintCountdownDigit {
    constructor(
        digitDOM,
        minSize = 300,
        initialDigitFontSize = 799,
        supportingTextDOM,
        timeout = 1000,
    ) {
        this.digitDOM = digitDOM;
        this.supportingTextDOM = supportingTextDOM;

        this.minSize = minSize;
        this.initialDigitFontSize = initialDigitFontSize;

        this.tickNumber = 1;
        this.maxTickNumber = 60;

        this.timeout = timeout;

        this.supportingText = {
            3: 'Hate ****** ads?',
            2: 'Wanna destroy it?',
            1: 'SAY! IT! AGAIN!',
            0: "Let's go!",
        };
    }

    _calculateFontSize() {
        if (this.tickNumber <= 0) {
            this.initialDigitFontSize;
        }

        let result = 0;
        if (this.tickNumber < this.maxTickNumber / 3) {
            result = (this.maxTickNumber - 3 * this.tickNumber) * 10 + this.minSize;
        } else {
            result = this.minSize;
        }

        return result;
    }

    _render() {
        templaetScript = ` 
            <div class="alert">
                <p>
                    Тут будет игра, но пока ее нет :^(
                    
                    игра - обычная аркада, в ходе которой пользователь
                    может зарабатывать игровую валюту, которую можно в 
                    дальнейшем потратить в игровом магазине. Пока можете
                    нажать Space, чтобы эмулировать завершение игры.
                </p>
            </div>
        `

        const template = Handlebars.compile(templateScript);
		document.body.innerHTML = template();
    }

    print(count) {
        if (count <= 3 && count >= 0) {
            this.supportingTextDOM.textContent = this.supportingText[count];
        }

        if (typeof count === 'undefined') {
            count = 3;
        }
        this.digitDOM.textContent = String(count);

        let countdown = setInterval((function() {
            this.digitDOM.style.fontSize = this._calculateFontSize() + 'px';

            this.tickNumber = this.tickNumber + 1;
        }).bind(this), 1000 / this.maxTickNumber);

        setTimeout((function() {
            clearInterval(countdown);
            this.tickNumber = 0;

            if (count > 0) {
                this.print(count - 1);
            }
        }).bind(this), 1000);    
    }

    run() {
        this.print(3);
        this._rendeer();
    }
}

let digit = document.getElementById('timer-digit');
let supportingText = document.getElementById('supporting-text');
let digitFontSize = parseFloat(window.getComputedStyle(digit, null).getPropertyValue('font-size'));
let countdown = new PrintCountdownDigit(digitDOM = digit, minSize = 400, initialDigitFontSize = 2000, supportingTextDOM = supportingText);

countdown.print(3);