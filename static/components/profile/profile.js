import GetAuthStatus from '../../modules/networkHandler.js';

/**
 * Класс для отрисовки профайла пользователя.
 */
export default class ProfileComponent {
	constructor(
		eventhandler,
		parentElement = document.getElementsByClassName("app"),
		authStatus = false,
	 ) {
		this._authStatus = authStatus;
		this._parentElement = parentElement;

		this._eventHandler = eventhandler;
		this._getAuthStatus = new GetAuthStatus();

		// bool, определяющий текущий режим профиля (просмотр/изменение)
		this._editCheck = false;
		this._users = {};
	}

	// Геттеры - Сеттеры
	get data() {
		return this._parentElement;
	}

	set data(obj) {
		this._parentElement = obj;
	}

	_render() {
		// На живца
		const that = this;
		this._parentElement.innerHTML = '';
		let templateScript = ``
		if (this._authStatus) {
			if (that._editCheck) {
				templateScript = `
					<div class="profile">
						<div class="userSection">
							<div class="userCart">
								<div class="nickname">
									<input class="inputs" type="text" name="nickname" value="{{nickname}}">
								</div>
								<div class="avatar">
									<img src="{{ImgUrl}}" alt="avatar" class="avatarImageEdit">
								</div>
								<iframe name="votar" style="display:none;"></iframe>
								<form enctype="multipart/form-data" method="post" class="mainForm" action="/upload" target="votar">
									<input name="uploadfile" type="file" accept="image/*" class="avatar_change">
									<input type="submit" value="send!" class="sub_photo">
								</form>
								<div class="about">
									<input class="inputs" type="text" name="About" value="{{About}}">
								</div>
								<div class="mainInfo">
									{{Points}}
								</div>
								<div class="buttonSection">
									<button class="sub_btn">Сохранить</button>
									<button class="back_btn">Отмена</button>
								</div>
								<div class="social">
									<a href="">vk</a>
									<a href="">fb</a>
									<a href="">inst</a>
									<a href="">tw</a>
									<a href="">pr</a>
								</div>
							</div>
							<div class="fullInfo">
								<div class="id">id: {{ID}}</div>
								<div class="region"><input class="inputs" type="text" name="Region" value="{{Region}}"></div>
								<div class="emailDiv"><input class="inputs" type="text" name="email" value="{{email}}"></div>
								<div class="age"><input type="text" class="inputs" name="Age" value="{{Age}}"></div>
							</div>
						</div>
					</div>
				`
			} else {
				templateScript = `
					<div class="profile">
						<div class="userSection">
							<div class="userCart">
								<div class="nickname">
									{{nickname}}
								</div>
								<div class="avatar">
									<img src="{{ImgUrl}}" alt="avatar" class="avatarImage">
								</div>
								<div class="about">
									{{About}}
								</div>
								<div class="mainInfo">
									points: {{Points}}
								</div>
								<div class="buttonSection">
									<button class="edit_btn">Изменить</button>
									<button data-section="menu" class="back_btn">Назад</button>
								</div>
								<div class="social">
									<a href="">vk</a>
									<a href="">fb</a>
									<a href="">inst</a>
									<a href="">tw</a>
									<a href="">pr</a>
								</div>
							</div>
							<div class="fullInfo">
								<div class="id">id: {{ID}}</div>
								<div class="region">region: {{Region}}</div>
								<div class="emailDiv">email: {{email}}</div>
								<div class="age">age: {{Age}}</div>
							</div>
						</div>
					</div>
				`
			}
		} else {
			templateScript = `
                <div class="menu">
                    <h1 class="title">Вы не авторизированы</h1>
                    <button data-section="login" class="btn">Войти</button>
                    <button data-section="signup" class="btn">Зарегистрироваться</button>
                    <button data-section="menu" class="btn">Назад</button>
                </div>
            `;
		}

		const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML += template(that._users);

		if (this._editCheck) {
			const submit = that._parentElement.querySelector('.sub_btn');
			const back = that._parentElement.querySelector('.back_btn');

			// Обработчик самбмита всех измененных данных пользователя, кроме аватара (для аватара
			// отдельная кнопка с отдельный обработчиком)
			submit.addEventListener('click', () => {
				that._editCheck = false;

				const inputs = that._parentElement.querySelectorAll('.inputs');

				const req = {};

				// Преобразуем типы (стринга -> инт), так как html input type="text"
				inputs.forEach((element) => {
					if (element.value != that._users[element.name] && element.name != 'avatar') {
						if (element.name === 'Age') {
							const age = parseInt(element.value);
							req[element.name] = age;
						} else {
							req[element.name] = element.value;
						}
					}
				});

				// Отправляем только те данные, которые поменял пользователь
				if (Object.keys(req).length == 0) {
					req.error = 'empty';
				}

				// Делаем post запрос на that._users/nickname, а не на /upload
				this._getAuthStatus.doPut({
					callback(data) {
						that._users = data;
						that._render();
					},
					path: `/users/${req.nickname}`,
					body:  JSON.stringify( req ),
				});
			});

			// Обработчик для кнопки возврата в режим просмотра профиля (измененные
			// данные не сохраняются)
			back.addEventListener('click', () => {
				that._editCheck = false;
				that._render();
			});
		// Режим просмотра
		} else {
			const edit = that._parentElement.querySelector('.edit_btn');

			console.log('parent:', that._parentElement, 'buttons:', edit);

			// Обработчик перехода в режим редактирвания
			edit.addEventListener('click', (event) => {
				event.preventDefault();
				that._editCheck = true;
				that._render();
			});
		}
	}

	// Главная функция, если пользователь залогинен, его отсылает на /me:
	// Делается get запрос -> сравнивается кука -> возвращается фулл инфо
	// о пользователе
	run(option) {
		const that = this;

		if (typeof option === 'object') {
			that._getAuthStatus.doGet({
				callback(data) {
					that._authStatus = data.is_auth;
					that._users = option;
					that._render();
				},
				path: '/isauth',
			});
		} else {
			that._authStatus = option;
			// Тут уже на мотыля
			that._getAuthStatus.doGet({
				callback(data) {
					that._users = data;
					// И подсекаем, подсекаем !
					that._render();
				},
				path: '/me',
			});
		}

		// Кнопки навигации
		// const submit = this._parentElement.querySelector('.sub_btn');
		// const back = this._parentElement.querySelector('.back_btn');

	}
}
