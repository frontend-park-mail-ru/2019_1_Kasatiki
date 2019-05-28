/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */

export default class Validation {
	checkPassword(password = '') {
		// const error = document.getElementById('password-validation-error');
		// input.className = 'login_input login_input_error';
		if (typeof password !== 'string') {
			return 'Wrong password type';
		}

		if ((password.length < 3) || (password.length > 30)) {
			return 'Use 3-30 characters for your password.';
		}
		if (!/^[a-zA-Z0-9!?.,_-]+$/.test(password)) {
			return 'Use only letters, numbers and punctuation characters.';
		}
		// error.textContent = '';
		// input.className = 'login_input';
		return 'OK';
	}

	checkNickname(nickname = '') {
		if (typeof nickname !== 'string') {
			return 'Wrong password type';
		}

		if (nickname.length < 1) {
			return 'Nickname is too short';
		}
		if (nickname.length > 30) {
			return 'Nickname is too big';
		}
		if (!/^[a-zA-Z0-9!?.,_-]+$/.test(nickname)) {
			return 'Use only letters, numbers and punctuation characters.';
		}
		if (!/^[a-zA-Z]+$/.test(nickname[0])) {
			return 'Nickname shoud start from letter';
		}

		return 'OK';
	}

	checkEmail(email = '') {
		if (!/^[0-9a-zA-Z-.]+@[0-9a-zA-Z-]{1,}\.[a-zA-Z]{1,}$/.test(email)) {
			return 'Invalid email';
		}

		return 'OK';
	}

	checkPhone(number = '' ) {
		if (typeof number !== 'string') {
			return 'Wrong phone type';
		}

		console.log('src',number, 'valid:', /[^0-9]/.test(number));

		if (number.length < 10) {
			return 'Wrong phone length';
		}

		if (/[^0-9]/.test(number)) {
			return 'Incorrect phone number';
		}

	}

	checkAmount(value = '') {
		if (typeof value !== 'string') {
			return 'Wrong amount value type';
		}

		if (/[^0-9]/.test(value)) {
			return 'Incorrect amount value';
		}
	}
}
