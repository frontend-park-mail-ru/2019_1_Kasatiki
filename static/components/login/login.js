/* eslint-disable import/prefer-default-export */

import CustomValidation from '../../modules/validation.js'
import GetAuthStatus from '../../modules/networkHandler.js'
import eventHandler from '../../modules/eventListener.js';

import ProfileComponent from '../profile/profile.js';


/**
 * Класс отрисовки формы логина.
 */
export default class LoginComponent {
	
	/**
	 * Конструтор.
	 * @param {node} parentElement - объект DOM-дерева, куда будет отрисовываться
	 *                               форма логина.
	 */
	constructor(
		parentElement = document.body,
	) {
		this._authStatus;
		this._parentElement = parentElement;

		this._profile = new ProfileComponent(this._parentElement);
		// Функции для eventHandler'a
		this._functions = {
			profile : this._profile,
		}

		this._eventHandler = new eventHandler(this._parentElement, this._functions);
        this._getAuthStatus = new GetAuthStatus();
		this._CustomValidation = new CustomValidation();
	}

	/**
	 * Метод отрисовки формы логина.
	 * @param {boolean} authStatus - флаг авторизации пользователя.
	 */
	_render() {
		this._parentElement.innerHTML = '';

		let templateScript = '';
		if (this._authStatus) {
			templateScript = `
                <div class="menu">
                    <h1 class="title">Вы уже авторизованы</h1>
                    <button data-section="menu" class="btn">Назад</button>
                </div>
            `;
		} else {
			templateScript = `
				<div class="menu">
					<h1 class="title">Login</h1>	
					<form id="login-form">
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
						<input name="submit" type="submit" class="btn">
						<button data-section="menu" class="btn">Назад</button>
					</form>
				</div>
			`;
		}

		const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML = template();
	}

	run(authStatus) {
		const that = this;

		this._authStatus = authStatus;

		this._render();

		const signInSection = document.querySelector(".menu");
		const form = document.querySelector("#login-form");

		console.log('signInSection',signInSection, 'form', form);

			// ToDo, Tmrln: зачем алерты? оч мешает
			
			// const signInChildNodes = signInSection.childNodes;

			// let id = -1;
			// console.log('childs', signInChildNodes);
			// for (let i = 0; i < signInChildNodes.length; i += 1) {
			// 	if ('login-form'.localeCompare(signInChildNodes[i].id) === 0) {
			// 		id = i;
			// 	}
			// }
			// if (id === -1) {
			// 	console.log('form id changed!!!');
			// 	return;
			// }
			// const form = signInChildNodes[id];

			form.addEventListener('submit',
				(event) => {
					event.preventDefault();

					// let validForm = true;

					// const validationBlocks = [
					// 	{
					// 		input: form.elements.login,
					// 		validationFunction: CustomValidation.checkNickname,
					// 		errorField: document.getElementById('login-validation-error'),
					// 	},
					// 	{
					// 		input: form.elements.password,
					// 		validationFunction: CustomValidation.checkPassword,
					// 		errorField: document.getElementById('password-validation-error'),
					// 	},
					// ];

					// validationBlocks.forEach((block) => {
					// 	// eslint-disable-next-line no-param-reassign
					// 	block.input.className = 'login_input';
					// 	// eslint-disable-next-line no-param-reassign
					// 	block.errorField.textContent = '';

					// 	const errorText = block.validationFunction(block.input.value);


					// 	if (errorText.localeCompare('OK') !== 0) {
					// 		// eslint-disable-next-line no-param-reassign
					// 		block.input.className = 'login_input login_input_error';
					// 		// eslint-disable-next-line no-param-reassign
					// 		block.errorField.textContent = errorText;
					// 		validForm = false;
					// 	}
					// });

					// if (!validForm) {
					// 	return;
					// }

					// console.log('changed:', answer.is_auth);

			// that._eventHandler.handle('profile');

			const payload = {
				nickname : form.elements.login.value,
				password : form.elements.password.value,
			}

			console.log(payload);

			this._getAuthStatus.doPost({
				callback(data) {
					if (typeof (data.Error) === 'undefined') {
						console.log('data in login:', data);
						that._eventHandler.handle('profile', data);
					} else {
						const validationError = document.getElementById('repeat-password-error');
						validationError.textContent = answer.Error;
					}
				},
				path: '/login',
				body: JSON.stringify( payload ),
			});
		});
	}
}
