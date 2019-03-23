/* eslint-disable import/prefer-default-export */

/**
 * Класс отрисовки формы регистрации.
 */
import CustomValidation from '../../modules/validation.js'
import GetAuthStatus from '../../modules/networkHandler.js'

export default class SignUpComponent {
	/**
	 * Конструтор.
	 * @param {node} parentElement - объект DOM-дерева, куда будет отрисовываться
	 *                               форма регистрации.
	 */
	constructor(
        handler,
        parentElement = document.body,
    ) {
        this._parentElement = parentElement;
        this._authStatus = false;

		this._eventHandler = handler;
        this._getAuthStatus = new GetAuthStatus();
        this._CustomValidation = new CustomValidation;
    }

	/**
     * Метод отрисовки формы регистрации.
     */
	_render() {
		const templateScript = `
            <div class="menu">    
                <h1 class="title">Sign Up</h1>
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
                    <input name="submit" type="submit" class="btn">                    
                    <button data-section="menu" class="btn">Назад</button>
                </form>
            </div>
        `;

		const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML = template();
    }
    
    run(authStatus) {
        this._authStatus = authStatus;
        this._render();

        // let id = -1;
        // const signUpSection = document.getElementById('signup-form');
        // const signUpChildNodes = signUpSection.childNodes;
        // for (let i = 0; i < signUpChildNodes.length; i += 1) {
        //     if ('signup-form'.localeCompare(signUpChildNodes[i].id) === 0) {
        //         id = i;
        //     }
        // }
        // if (id === -1) {
        //     return;
        // }

        const form = document.getElementById('signup-form');
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const that = this;

            const validationBlocks = [
                {
                    input: form.elements.nickname,
                    validationFunction: this._CustomValidation.checkNickname,
                    errorField: document.getElementById('nickname-validation-error'),
                },
                {
                    input: form.elements.email,
                    validationFunction: this._CustomValidation.checkEmail,
                    errorField: document.getElementById('email-validation-error'),
                },
                {
                    input: form.elements.password,
                    validationFunction: this._CustomValidation.checkPassword,
                    errorField: document.getElementById('password-validation-error'),
                },
            ];

            const validForm = true;

            validationBlocks.forEach((block) => {
                // eslint-disable-next-line no-param-reassign
                block.input.className = 'login_input';
                // eslint-disable-next-line no-param-reassign
                block.errorField.textContent = '';

                const errorText = block.validationFunction(block.input.value);

                if (errorText.localeCompare('OK') !== 0) {
                    // eslint-disable-next-line no-param-reassign
                    block.input.className = 'signup_input signup_input_error';
                    // eslint-disable-next-line no-param-reassign
                    block.errorField.textContent = errorText;
                    validForm = false;
                }
            });

            const { password } = form.elements;
            // eslint-disable-next-line camelcase
            const { password_repeat } = form.elements;

            if (password.value.localeCompare(password_repeat.value) !== 0) {
                password_repeat.className = 'signup_input signup_input_error';

                const errorField = document.getElementById('repeat-password-error');
                errorField.textContent = 'Passwords do not match.';

                validForm = false;
            } else {
                form.elements.password_repeat.className = 'signup_input';

                const errorField = document.getElementById('repeat-password-error');
                errorField.textContent = '';
            }

            if (!validForm) {
                return;
            }

            const payload = {
                nickname: form.elements.nickname.value,
                email: form.elements.email.value,
                password: form.elements.password.value,
			}

			this._getAuthStatus.doPost({
				callback(data) {
					if (typeof (data.Error) === 'undefined') {

						that._eventHandler.handle('profile', data);
					} else {
						const validationError = document.getElementById('repeat-password-error');
						validationError.textContent = answer.Error;
					}
				},
				path: '/signup',
				body: JSON.stringify( payload ),
			});
        });
    }
}
