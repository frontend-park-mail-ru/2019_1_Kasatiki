export default class LeaderboardComponent {
    /**
	 * Конструктор
	 * @param {Object} parentElement - Элемент DOM дерева,
	 * куда будет отрисовываться leader board.
	 */
	constructor(
		parentElement = document.body,
		usersPerPage = 5,
		totalPages = 5,
	) {
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

	_renderPaginator(offset) {
		// Шаблон без div, так как div прописан в шаблоне борды
		let templateScript = '';
		if (this._pagesDict._currentPage > 1) {
			templateScript += '<button href="/leaderboard?offset={{prev}}" class="prev leaderboard_page-button"><i class="fas fa-arrow-left"></i></button>';
		}
		templateScript += '<h1 class="leaderboard_page-pageNumber">{{curr}}</h1>';
		console.log(this._pagesDict._totalPages, this._pagesDict._currentPage);
		if (this._pagesDict._currentPage < this._pagesDict._totalPages) {
			templateScript += '<button href="/leaderboard?offset={{next}}" class="next leaderboard_page-button"><i class="fas fa-arrow-right"></i></button>';
		}
		
		console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		let data = {
			prev: offset-1,
			curr: offset,
			next: offset+1,
		}
		this._paginatorSection.innerHTML += template(data);
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
	render(offset) {
		this._pagesDict._currentPage = offset;

		// Итерируясь по юзерам, выводим строки таблицы
		// Зарание создал место для пагинатора: <div class="paginatorSection"></div>
		const templateScript = `
		<div class="leaderboard">
			<h1 class="leaderboard__title">Leaderboard</h1>
			<div class="board">
				{{#each .}}
				<div class="board__player">
					<h3 class="board__player-place">{{ID}}</h3>
					<h3 class="board__player-nickname">{{nickname}}</h3>
					<h3 class="board__player-points">{{Points}}</h3>
				</div>
				{{/each}} 
			</div>
			<div class="paginator-section"></div>
			<button class="leaderboard_back-button" href="/" data-section="menu"><i href="/" class="fas fa-undo-alt"></i>
			</button>
		</div>
		`;

		const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML = template(this._usersArr);

		// Вытаскиваю из DOM'а <div class="paginatorSection"></div>, записываю его в 
		// _paginatorSection: 
		this._paginatorSection = this._parentElement.querySelector('.paginator-section');

		// Рендерю пагинатор в _paginatorSection
		this._renderPaginator(offset);
	}
}
