// eslint-disable-next-line import/prefer-default-export

import GetAuthStatus from '../../modules/networkHandler.js';

/**
 * Класс с методом render для отрисовки leader board.
 */ 
export default class BoardComponent {
	/**
	 * Конструктор
	 * @param {Object} parentElement - Элемент DOM дерева,
	 * куда будет отрисовываться leader board.
	 */
	constructor(
		parentElement = document.body,
		usersPerPage = 5,
		totalPages = 2,
	) {
		this._getAuthStatus = new GetAuthStatus();

		// Поля таблицы
		this._parentElement = parentElement;
		this._usersArr = {};

		// Поля пагинатора
		this._usersPerPage = usersPerPage;

		this._pagesDict = {
			_currentPage: 1,
			_totalPages: totalPages,
		};

		// Блок пагинатора
		this._paginatorSection = this._parentElement;
	}

	// Методы пагинатора

	// Методы пагинатора рендарят борду
	/**
	 * Метод отрисовки предыдущей страницы.
	 */
	_getPrevPage() {
		if (this._pagesDict._currentPage > 1) 
		{ 
			this._pagesDict._currentPage--;

			// Формирую оффсет, который передается на бэк
			const offset = this._pagesDict._currentPage * this._usersPerPage;

			const that = this;

			this._getAuthStatus.doGet({
				callback(data) {
					// Принимаю ответ с бэка с отсортирваными пользователями, 
					// записываю его в _usersArr, отрисовываю борду
					that._usersArr = data;
					that._renderBoard();
				},
				path: `/leaderboard?offset=${offset}`,
			});
		}
	}

	/**
	 * Метод отрисовки следующей страницы.
	 */
	_getNextPage() {
		if (this._pagesDict._currentPage < this._pagesDict._totalPages) 
		{
			this._pagesDict._currentPage++;

			const offset = this._pagesDict._currentPage * this._usersPerPage;
	
			const that = this;
	
			this._getAuthStatus.doGet({
				callback(data) {
					// Принимаю ответ с бэка с отсортирваными пользователями, 
					// записываю его в _usersArr, отрисовываю борду
					that._usersArr = data;
					that._renderBoard();
				},
				path: `/leaderboard?offset=${offset}`,
			});
		} 
	}

	_renderPaginator() {
		// Шаблон без div, так как div прописан в шаблоне борды
		const templateScript = `
			<button class="prev btn"><</button>
			<h1 class="pageNumber">{{_currentPage}}</h1>
			<button class="next btn">></button>
		`;
		
		const template = Handlebars.compile(templateScript);
		this._paginatorSection.innerHTML += template(this._pagesDict);

		const prevButton = this._parentElement.querySelector('.prev');
		const nextButton = this._parentElement.querySelector('.next');

		// Отрисовываю сначалу борду, создавая тем самым
		nextButton.addEventListener('click', () => {
			this._paginatorSection.innerHTML = '';
			this._getNextPage();
			this._renderPaginator();
		});

		prevButton.addEventListener('click', () => {
			this._paginatorSection.innerHTML = '';
			this._getPrevPage();
			this._renderPaginator();
		});
	}

	// Методы борды

	/**
	 * Геттер данных о пользователях.
	 */
	get users() {
		return this._usersArr;
	}

	/**
	 * Сеттер данных о пользователях.
	*/
	set users(users = []) {
		this._usersArr = users;
	}

	/**
	 * Метод для отрисоки leader board.
	 * @param {array} users - массив данных о пользователях.
	 */
	_renderBoard() {
		this._parentElement.innerHTML = '';
		// Итерируясь по юзерам, выводим строки таблицы
		// Зарание создал место для пагинатора: <div class="paginatorSection"></div>
		const templateScript = `
			<div class="menu">
				<h1 class="title">Leaderboard</h1>
				<table class="leadersTable" border="1" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>Nickname</th>
							<th>Region</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{{#each .}}                  
							<tr class="tr">
								<td>{{nickname}}</td>
								<td>{{Region}}</td>
								<td>{{Points}}</td>
							</tr>
						{{/each}}
					</tbody>
				</table>
				<div class="paginatorSection">
				</div>
				<button data-section="menu" class="btn">Назад</button>
			</div>
		`;

		const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML += template(this._usersArr);

		// Вытаскиваю из DOM'а <div class="paginatorSection"></div>, записываю его в 
		// _paginatorSection: 
		this._paginatorSection = this._parentElement.querySelector('.paginatorSection');

		// Рендерю пагинатор в _paginatorSection
		this._renderPaginator();
	}

	run() {
		const that = this;
		this._getAuthStatus.doGet({
			callback(data) {
				that._usersArr = data;
				that._renderBoard();
			},
			path: '/leaderboard',
		});
	}
}
