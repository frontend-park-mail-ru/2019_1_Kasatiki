export class LoginComponent {
    constructor({
        el = document.body,
    } = {}) {
        this._el = el;
    }

    get data() {
        return this._data;
    }

    set data(d = []) {
        this._data = d;
    }

    render(authStatus) {
        if (authStatus) {
            var templateScript = `
                <div>
                    <h1>Вы уже авторизованы</h1>
                    <button data-section="menu" class="btn">Назад</button>
                </div>
            `;
        } else {
            var templateScript = `
                <form>
                    <input
                        name="nickname"
                        type="text"
                        placeholder="Nickname"
                        class="login_input"
                        title='Никнейм должен состоять только из 3-20 латинских букв, цифр и символов "_" и "-", а также должен начинаться с буквы. Можно ввести email.'>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="login_input"
                        title="Пароль должен состоять только из 3-20 латинских букв, цифр и символов пунктуации.">
                    <input name="submit" type="submit" class="login_btn">
                    <button data-section="menu" class="btn">Назад</button>
                </form>
            `;
        }

        const template = Handlebars.compile(templateScript);
        this._el.innerHTML = template();
    }
}