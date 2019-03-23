/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import LoginComponent from './components/login/login.js';
import SignUpComponent from './components/signup/signup.js';
import PaginationComponent from './components/pagination/pagination.js';
import BoardComponent from './components/board/board.js';
import HelperComponent from './components/helper/helper.js';
import ProfileComponent from './components/profile/profile.js';
// import { ValidModule } from './modules/loginValidator.js';

const { AjaxModule } = window;
const { CustomValidation } = window;

AjaxModule.doGet({
	callback(xhr) {
		const answer = JSON.parse(xhr.responseText);
		console.log(answer, answer.is_auth, document.cookie);
		if (!answer.is_auth) {
			answer.is_auth = false;
		}
		console.log('client started');

		// Разименовывем необходимые элементы DOM'a

		const app = document.getElementById('application');
		const helper = new HelperComponent();

		const main = document.createElement('div');
		main.className = 'main';
		app.appendChild(main);

		/**
		 * Отрисовка главного меню.
		 */
		function createMenu() {
			console.log('auth status: ', answer.is_auth);

			// Разное меню для залогиненых/разлогиненых пользователей
			let menuItems = {};
			if (answer.is_auth) {
				menuItems = {
					game: 'Играть',
					leaderboard: 'Таблица лидеров',
					// about: 'О приложении',
					profile: 'Профайл',
					logout: 'Выйти',
				};
			} else {
				menuItems = {
					signup: 'Регистрация',
					login: 'Логин',
					game: 'Играть',
					leaderboard: 'Таблица лидеров',
					// about: 'О приложении',
					profile: 'Профайл',
				};
			}

			main.innerHTML = '';

			const menu = document.createElement('div');
			menu.className = 'menu';
			main.appendChild(menu);

			// Добаляем название блока
			helper.createTitle(menu, 'Main menu');

			// Создаем кнопки
			Object.keys(menuItems).forEach((key) => {
				helper.createButton(menu, key, 'btn', menuItems[key]);
			});
		}

		// ToDo: Tmrln: нужно поправить
		/**
		 * Отрисовка формы логина.
		 */
		function createLogin() {
			// ToDo, Tmrln: написать (если нужно) пояснения к блоку
			main.innerHTML = '';

			const signInSection = document.createElement('div');
			signInSection.className = 'menu';
			signInSection.dataset.section = 'login';

			main.appendChild(signInSection);

			const profile = new ProfileComponent(signInSection);
			const login = new LoginComponent({ el: signInSection });

			login.render(answer.is_auth);

			// ToDo, Tmrln: зачем алерты? оч мешает
			let id = -1;
			const signInChildNodes = signInSection.childNodes;
			console.log(signInSection);
			for (let i = 0; i < signInChildNodes.length; i += 1) {
				if ('login-form'.localeCompare(signInChildNodes[i].id) === 0) {
					id = i;
				}
			}
			if (id === -1) {
				console.log('form id changed!!!');
				return;
			}
			const form = signInChildNodes[id];

			form.addEventListener('submit',
				(event) => {
					event.preventDefault();

					let validForm = true;

					const validationBlocks = [
						{
							input: form.elements.login,
							validationFunction: CustomValidation.checkNickname,
							errorField: document.getElementById('login-validation-error'),
						},
						{
							input: form.elements.password,
							validationFunction: CustomValidation.checkPassword,
							errorField: document.getElementById('password-validation-error'),
						},
					];

					validationBlocks.forEach((block) => {
						// eslint-disable-next-line no-param-reassign
						block.input.className = 'login_input';
						// eslint-disable-next-line no-param-reassign
						block.errorField.textContent = '';

						const errorText = block.validationFunction(block.input.value);


						if (errorText.localeCompare('OK') !== 0) {
							// eslint-disable-next-line no-param-reassign
							block.input.className = 'login_input login_input_error';
							// eslint-disable-next-line no-param-reassign
							block.errorField.textContent = errorText;
							validForm = false;
						}
					});

					if (!validForm) {
						return;
					}

					console.log('changed:', answer.is_auth);

					AjaxModule.doPost({
						callback(xhr) {
							const answer = JSON.parse(xhr.responseText);
							if (typeof answer.Error === 'undefined') {
								main.innerHTML = '';
								console.log(answer);

								// вызываю сетер

								// Мы отказались от никнейма втроым аргументом и теперь делаем запрос на me
								profile.createProfile(answer.is_auth);
							} else {
								const validationError = document.getElementById('password-validation-error');
								validationError.textContent = answer.Error;
							}
						},
						path: '/login',
						body: {
							nickname: form.elements.login.value,
							password: form.elements.password.value,
						},
					});
				});
		}

		/**
		 * Отрисовка формы регистрации.
		 */
		function createSignup() {
			main.innerHTML = '';

			const signUpSection = document.createElement('section');
			signUpSection.className = 'menu';
			signUpSection.dataset.section = 'sign_up';

			// const profile = new ProfileComponent(signUpSection);
			const signUp = new SignUpComponent({
				el: signUpSection,
			});

			signUp.render();

			let id = -1;
			const signUpChildNodes = signUpSection.childNodes;
			for (let i = 0; i < signUpChildNodes.length; i += 1) {
				if ('signup-form'.localeCompare(signUpChildNodes[i].id) === 0) {
					id = i;
				}
			}
			if (id === -1) {
				alert('form id changed!!!');
				return;
			}

			const form = signUpChildNodes[id];

			// TODO: может быть написать и button on click

			form.addEventListener('submit',
				(event) => {
					event.preventDefault();

					let validForm = true;

					const validationBlocks = [
						{
							input: form.elements.nickname,
							validationFunction: CustomValidation.checkNickname,
							errorField: document.getElementById('nickname-validation-error'),
						},
						{
							input: form.elements.email,
							validationFunction: CustomValidation.checkEmail,
							errorField: document.getElementById('email-validation-error'),
						},
						{
							input: form.elements.password,
							validationFunction: CustomValidation.checkPassword,
							errorField: document.getElementById('password-validation-error'),
						},
					];

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

					AjaxModule.doPost({
						callback(xhr) {
							const responseAnswer = xhr.responseText;
							const answer = JSON.stringify(responseAnswer);

							if (typeof (answer.Error) === 'undefined') {
								main.innerHTML = '';
								createMenu();
								console.log('OK');
							} else {
								const validationError = document.getElementById('repeat-password-error');
								validationError.textContent = answer.Error;
							}
						},
						path: '/signup',
						body: {
							nickname: form.elements.nickname.value,
							email: form.elements.email.value,
							password: form.elements.password.value,
						},
					});
				});

			main.appendChild(signUpSection);
		}

		/**
		 * Отрисовка профайла.
		 */
		function createProfile() {
			// Создаем родительский элемент
			const profileSection = document.createElement('div');
			profileSection.className = 'menu';
			profileSection.dataset.section = 'profile';

			// Добавляем его к main'у
			main.appendChild(profileSection);

			// Создаем объект класса profile...
			const profile = new ProfileComponent(profileSection);

			// Запрос на me
			AjaxModule.doGet({
				callback(xhr) {
					const user = JSON.parse(xhr.responseText);
					profile.render(answer.is_auth, user);
					console.log(user);
				},
				path: '/me',
			});
		}

		// Примитивная реализация геймплея, при выходе нужно обновить страницу
		// пока не трогаем
		/**
		 * Отрисовка игры.
		 */
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
			gameLogic.id = 'gamejs';
			gameLogic.src = '/game.js';
			main.appendChild(gameLogic);

			// createButton(menu, 'menu', 'btn', 'Back');
		}

		/**
		 * Отрисовка таблица leader board.
		 */
		function createLeaderboard(users) {
			main.innerHTML = '';

			AjaxModule.token = 'dadaad';

			// Создаем родительский блок
			const leaderboard = document.createElement('div');
			leaderboard.dataset.section = 'leaderboard';
			leaderboard.className = 'menu';

			helper.createTitle(leaderboard, 'Leaderboard');

			if (users) {
				const paginator = new PaginationComponent({
					parentElement: leaderboard,
					// Количество пользователей на странице
					usersPerPage: 1,
					// Можно прикрутить максимально количество страниц, но работает и без этого
					totalPages: 3,
				});
				const board = new BoardComponent({ parentElement: leaderboard });

				// Сетим дату
				board.data = JSON.parse(JSON.stringify(users));

				// Отрисовываем борду, затем пагинатор
				board.render(users);
				paginator.renderPaginator(3);
			// Если юзеры не пришли, еще раз стучимся
			} else {
				console.log('data loading, please wait');

				AjaxModule.doGet({
					callback(xhr) {
						const user = JSON.parse(xhr.responseText);
						main.innerHTML = '';
						createLeaderboard(user);
					},
					path: '/leaderboard',
				});
			}

			main.appendChild(leaderboard);
		}

		/**
		 * Выход из аккаунта.
		 */
		function createLogout() {
			AjaxModule.doGet({
				callback() {
				},
				path: '/logout',
			});
			createMenu();
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
			logout: createLogout,


			// Other functions
			title: helper.createTitle,
		};

		// Обработчик всех евентов в DOM'е
		app.addEventListener('click',
			(evt) => {
				const { target } = evt;

				// console.log('click on ', target, 'datasec: ', target.dataset.section);

				// Если target является кнопкой
				if (target instanceof HTMLButtonElement) {
					if (target.dataset.section in functions) {
						// Убираем все стандартные обработчики
						evt.preventDefault();

						const { section } = target.dataset;

						functions[section]();
					}
				}
			});
	},
	path: '/isauth',
	// body : {'cookie' : document.cookie},
});
