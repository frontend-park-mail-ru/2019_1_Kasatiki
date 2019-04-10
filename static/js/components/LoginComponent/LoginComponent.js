export default class LoginComponent {
    /**
     * Функция, возвращающая строку в формате html с формой логина.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    render(isAuth) {
        let templateScript = ``;
		if (isAuth) {
			templateScript = `
                <h1 class="title">Вы уже авторизованы</h1>
				<a href="/" class="btn">Назад</a>
            `;
		} else {
			templateScript = `
				<div class="login">
					<h1 class="login__title">Login</h1>	
					<form id="login-form" class="login-form">
						<input
							name="login"
							type="text"
							placeholder="Nickname"
							class="login__input"
							id="login__input-login"
							autocomplete="on"
							required>
						<input
							name="password"
							type="password"
							placeholder="Password"
							class="login__input"
							id="login__input-password"
							autocomplete="on"
							required>
                        <div id="login__authorization-error-field" class="login_error_text"></div>
                        <div class="login__btn">
                        </div>
						<div class="login__btn-section">
							<button href="/" class="login-btn"><i href="/" class="fas fa-undo-alt"></i></button>
							<button href="/authorizeuser" class="login-btn"><i href="/authorizeuser" class="fas fa-angle-double-right"></i></button>
						</div>
					</form>
				</div>
			`;
		}
		const template = Handlebars.compile(templateScript);		
        return template();
	}

	setOnChangeListener(input) {
		input.addEventListener("input", () => {
			this.goodField(input);
		});
	}
	
	get login() {
		return document.getElementById('login__input-login');
	}

	get password() {
		return document.getElementById('login__input-password');
	}

	setErrorText(text) {
		if (typeof text !== 'string') {
			console.log('NOTE: text is not string');
			return;
		}
		let errorField = document.getElementById('login__authorization-error-field');
		errorField.textContent = text;
	}

	goodField(input) {
		input.setCustomValidity("");
	}

	errorField(input, validationMessage) {
		input.setCustomValidity("SADASD");
	}
}