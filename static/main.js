'use strict'

import {LoginComponent} from './components/login/login.js';
import {SignUpComponent} from './components/signup/signup.js';
import {paginationComponent} from './components/pagination/pagination.js';
import {boardComponent} from './components/board/board.js';
import {helperComponent} from './components/helper/helper.js';
import {profileComponent} from './components/profile/profile.js'

const {AjaxModule} = window;

var adress = '127.0.0.1:8080';

console.log("Server started");

// Разименовывем необходимые элементы DOM'a

const app = document.getElementById("application");
const helper = new helperComponent();

const header = document.createElement('div');
header.dataset.section = "header";
app.appendChild(header);

const side = document.createElement('div');
side.dataset.section = "sidebar";
app.appendChild(side);

const main = document.createElement('div');
main.className = "main";
app.appendChild(main);

// Валидация данных в форме
function validateNickname(nickname = "") {
	return /^[a-zA-z]{1}[a-zA-Z1-9]{2,20}$/.test(nickname);
}

function validateEmail(email = "") {
	return /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email);
}

function validateLogin(login = "") {
	if (login.search(/@/i) !== -1) {
		return validateEmail(login);
	}
	return validateNickname(login);
}

function validatePassword(password = "") {
	if (password.length < 3 || password.length > 20) {
		return false;
	}
	return /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/.test(password);
}

// Основные функции, отвечают за логику работы фронта/генерирование контента и тд
function createMenu() {
	const menuItems = {
		signup: 'Регистрация',
		login: 'Логин',
		game: 'Играть',
		leaderboard: 'Таблица лидеров',
		// about: 'О приложении',
		profile: 'Профайл',
	};

	main.innerHTML = '';

	const menu = document.createElement('div');
	menu.className = 'menu';
	main.appendChild(menu);

	helper.createTitle(menu, 'Main menu');
	Object.keys(menuItems).forEach( (key, value) => {
		helper.createButton(menu, key, 'btn', menuItems[key]);
	});
}

function createLogin() {
	main.innerHTML = '';

	// createTitle('Login');

	const signInSection = document.createElement('div');
	signInSection.className = 'menu';
	signInSection.dataset.sectionName = 'login';

	main.appendChild(signInSection);

	const profile = new profileComponent(signInSection);

	const login = new LoginComponent({
		el: signInSection,
	});
	login.render();

	const form = signInSection.childNodes[1];
	// Нужно научиться достовать по ключу form

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const fieldsName = [
			'nickname',
			'password',
		]
		
		const validationFunction = {
			nickname: validateLogin,
			password: validatePassword,
		}

		let validationError = false;
		fieldsName.forEach(function(fieldName) {
			const field = form.elements[fieldName];
			field.className = "login_input";

			if (!validationFunction[ fieldName ]( field.value )) {
				field.className = "login_input login_bad_input";
				validationError = true;
			} else {
				field.className = "login_input login_good_input";
			}
		});

		if (validationError) {
			return;
		}

		// const nickname = form.elements[ 'nickname' ].value;
		// const password = form.elements[ 'password' ].value;

		// let nicknameField = form.elements[ 'nickname' ];
		// let passwordField = form.elements[ 'password' ];

		// nicknameField.className = "login_input";
		// passwordField.className = "login_input";

		// if (!validateLogin(nickname)) {
		// 	nicknameField.className = "login_input login_bad_input";
		// 	return;
		// } else {
		// 	nicknameField.className = "login_input login_good_input";
		// }

		// if (!validatePassword(password)) {
		// 	passwordField.className = "login_input login_bad_input";
		// 	return;
		// } else {
		// 	passwordField.className = "login_input login_good_input";
		// }

		AjaxModule.doPost({
			callback(xhr) {
				const answer = JSON.parse(xhr.responseText);
				if (typeof(answer['Error']) === "undefined") {
					main.innerHTML = '';
					console.log(answer);
					console.log("OK");
					console.log(form.elements[ 'nickname' ].value);

					profile.createProfile(form.elements[ 'nickname' ].value);
				} else {
					alert(answer['Error']);
					console.log("WTF?");
				}
			},
			path: '/login',
			body: {
				nickname: form.elements[ 'nickname' ].value,
				password: form.elements[ 'password' ].value,
			},
		});
	});

}

function createSignup() {
	main.innerHTML = '';

	const signUpSection = document.createElement('section');
	signUpSection.className = 'menu';	
	signUpSection.dataset.sectionName = 'sign_up';

	const signUp = new SignUpComponent({
		el: signUpSection,
	});
	signUp.render();

	const form = signUpSection.childNodes[1];
	console.log(signUpSection.childNodes);

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const nickname = form.elements[ 'nickname' ].value;
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ];

		const fieldsName = [
			'email',
			'nickname',
			'password',
		]
		
		const validationFunction = {
			email: validateEmail,
			nickname: validateLogin,
			password: validatePassword,
		}

		let validationError = false;
		fieldsName.forEach(function(fieldName) {
			const field = form.elements[fieldName];
			field.className = "signup_input";

			if (!validationFunction[ fieldName ]( field.value )) {
				field.className = "signup_input signup_bad_input";
				validationError = true;
			} else {
				field.className = "signup_input signup_good_input";
			}
		});

		if (password !== form.elements[ 'password_repeat' ].value) {
			form.elements[ 'password_repeat' ].className = "signup_input signup_bad_input";
			validationError = true;
		} else {
			form.elements[ 'password_repeat' ].className = "signup_input signup_good_input";
		}

		if (validationError) {
			return;
		}

		AjaxModule.doPost({
			callback(xhr) {
				const answer = JSON.parse(xhr.responseText);
				if (typeof(answer['Error']) === "undefined") {
					main.innerHTML = '';
					console.log(answer);
					main.innerHTML = JSON.stringify(answer);
					console.log("OK");
				} else {
					alert(answer['Error']);
					console.log("WTF?");
				}
			},
			path: '/signup',
			body: {
				nickname: nickname,
				email: email,
				password: password
			}
		});
	});

	main.appendChild(signUpSection);
}

function createProfile() {

}

function createGame() {
	main.innerHTML = '';

	const menu = document.createElement('div');
	menu.className = 'gameBlock';
	main.appendChild(menu);

	const canvas = document.createElement('canvas');
	canvas.id = 'gameCanvas';
	canvas.width = 700;
	canvas.height = 700;
	menu.appendChild(canvas);

	const buf = document.getElementById('gamejs');
	if (buf !== null) {
		alert('got!');
	}

	const gameLogic = document.createElement('script');
	gameLogic.id = "gamejs";
	gameLogic.src = '/game.js'
	main.appendChild(gameLogic);

	createButton(menu, 'menu', 'btn', 'Back');
}

function createLeaderboard(users) {
	main.innerHTML = '';

	const leaderboard = document.createElement('div');
	leaderboard.dataset.section = 'leaderboard';
	leaderboard.className = 'menu';
	helper.createTitle(leaderboard, 'Leaderboard');

	if (users) {
		const paginator = new paginationComponent({parentElement : leaderboard,
													usersPerPage : 1,
													totalPages : 7,
													});
		const board = new boardComponent({parentElement : leaderboard});
		board.data = JSON.parse(JSON.stringify(users));

		board.render(users); 
		paginator.renderPaginator(7);
	} else {
		console.log('data loading, please wait');

		AjaxModule.doGet({	
			callback(xhr) {
				const user = JSON.parse(xhr.responseText);
				main.innerHTML = '';
				createLeaderboard(user);
			},
			path : '/leaderboard',
		});
	};

	main.appendChild(leaderboard);
}

function createAbout() {

}


// Главный блок: создаем меню 
createMenu();

// Карта функций, сюда будем подгруать новые функции
const functions = {
	menu: createMenu,

	// Menu elements
	signup: createSignup,
	login: createLogin,
	game: createGame,
	leaderboard: createLeaderboard,
	profile: createProfile,
	// about: createAbout,


	// Other functions
	title: helper.createTitle,
};

// Обработчик всех евентов в DOM'е
app.addEventListener('click', (evt) => {

	const target = evt.target;

	// console.log('click on ', target, 'datasec: ', target.dataset.section);

	// Если target является кнопкой 
	if (target instanceof HTMLButtonElement) {
		if (target.dataset.section in functions) {
			// Убираем все стандартные обработчики	
			evt.preventDefault();

			const section = target.dataset.section;

			functions[section]();
		}
	};
});