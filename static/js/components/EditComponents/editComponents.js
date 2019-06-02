export default class EditComponent {
    /**
     * Функция, возвращающая строку в формате html с формой логина.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    render(data) {
        let templateScript = ``;
        templateScript = `
            <div class="edit">
                <h1 class="edit__title">edit</h1>	
                <form id="edit-form" class="edit-form">
                    <div class="edot-form__avater-srction">
                        
                    </div>
                    <div class="edot-form__inputs-srction">
                        <div class="edit__input-border">
                        <input
                            name="nickname"
                            type="text"
                            placeholder="Nickname"
                            class="edit__input edit-nickname"
                            autocomplete="on"
                        >
                        </div>
                        <div class = "edit__input-border">
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                class="edit__input edit-password"
                                autocomplete="on"
                            >
                        </div>
                        <div class = "edit__input-border">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            class="edit__input edit-password"
                            autocomplete="on"
                        >
                    </div>
                </div>
                    <div id="edit__authorization-error-field" class="edit_error_text"></div>
                    <div class="edit__btn">
                    </div>
                    <div class="edit__btn-section">
                        <button href="/authorizeuser" class="edit-btn"><i href="/authorizeuser" class="fas fa-angle-double-right"></i></button>
                        <button href="/" class="edit-btn"><i href="/" class="fas fa-chevron-left"></i></button>
                    </div>
                </form>
            </div>
        `;
		const template = Handlebars.compile(templateScript);		
        return template(data);
	}

	setOnChangeListener(input) {
		input.addEventListener("input", () => {
			this.goodField(input);
			// this.setErrorText("");
			// this.style.background-color = 'white';
		});
	}
	
	get edit() {
		return document.getElementById('edit__input-edit');
	}

	get password() {
		return document.getElementById('edit__input-password');
	}

	setErrorText(text) {
		if (typeof text !== 'string') {
			console.log('NOTE: text is not string');
			return;
		}
		let errorField = document.getElementById('edit__authorization-error-field');
		errorField.textContent = text;
	}

	goodField(input) {
		input.setCustomValidity("");
	}

	errorField(input) {
		input.setCustomValidity("-_-");
	}
}