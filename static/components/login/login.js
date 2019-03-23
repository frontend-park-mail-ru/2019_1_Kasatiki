/* eslint-disable import/prefer-default-export */

/**
 * Класс отрисовки формы логина.
 */
export default class LoginComponent {
	/**
	 * Конструтор.
	 * @param {node} el - объект DOM-дерева, куда будет отрисовываться
	 *                               форма логина.
	 */
	constructor({
		el = document.body,
	} = {}) {
		this.el = el;
	}

	/**
	 * Метод отрисовки формы логина.
	 * @param {boolean} authStatus - флаг авторизации пользователя.
	 */
	render(authStatus) {
		let templateScript = '';
		if (authStatus) {
			templateScript = `
                <div>
                    <h1>Вы уже авторизованы</h1>
                    <button data-section="menu" class="btn">Назад</button>
                </div>
            `;
		} else {
			templateScript = `
                <form id="login-form">
					<h1>Login</h1>
                    <input
                        name="login"
                        type="text"
                        placeholder="Nickname"
						class="login_input"
						required>
					<div id="login-validation-error" class="login_input_error_text"></div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
						class="login_input"
						required>
					<div id="password-validation-error" class="login_input_error_text"></div>
                    <input name="submit" type="submit" class="login_btn">
                    <button data-section="menu" class="btn">Назад</button>
                </form>
            `;
		}
		const template = Handlebars.compile(templateScript);
		this.el.innerHTML = template();
	}
}
