/* eslint-disable import/prefer-default-export */

/**
 * Класс отрисовки формы логина.
 */
export default class SignUpComponent {
	/**
	 * Конструтор.
	 * @param {node} el - объект DOM-дерева, куда будет отрисовываться
	 *                               форма регистрации.
	 */
	constructor({
		el = document.body,
	} = {}) {
		this.el = el;
	}

	/**
     * Метод отрисовки формы регистрации.
     */
	render() {
		const templateScript = `
            <h1>Sign Up</h1>

            <form id="signup-form">
                <input
                    name="nickname"
                    type="text"
                    placeholder="Username"
                    class="signup_input"
                    required>
				<div id="nickname-validation-error" class="signup_input_error_text"></div>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    class="signup_input"
                    required>
                <div id="email-validation-error" class="signup_input_error_text"></div>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    class="signup_input"
                    required>
				<div id="password-validation-error" class="signup_input_error_text"></div>                
                <input
                    name="password_repeat"
                    type="password"
                    placeholder="Repeat Password"
                    class="signup_input"
                    required>
                <div id="repeat-password-error" class="signup_input_error_text"></div>  
                <input name="submit" type="submit" class="signup_btn">                    
                <button data-section="menu" class="signup_btn">Назад</button>
            </form>
        `;

		const template = Handlebars.compile(templateScript);
		this.el.innerHTML = template();
	}
}
