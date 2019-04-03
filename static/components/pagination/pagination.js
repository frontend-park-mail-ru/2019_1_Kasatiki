// eslint-disable-next-line import/extensions

const { AjaxModule } = window;

/**
 * Класс для отрисовки leader board с Пагинацией.
 */
export default class PaginationComponent {
	/**
	 * Конструтор.
	 * @param {node} parentElement - объект DOM-дерева, куда будет отрисовываться
	 *                               таблица leader board.
	 * @param {int} usersPerPage - количество пользователей в таблице.
	 * @param {int} totalPages - общее количество страниц,
	 */
	constructor({
		boardElement,
		parentElement = document.body,
		usersPerPage = 1,
		totalPages = 1,
	} = {}) {
		this._boardElement = boardElement;
		this._parentElement = parentElement;
		this._usersPerPage = usersPerPage;

		this._pagesDict = {
			_currentPage: 1,
			_totalPages: totalPages,
		};
	}

	/**
	 * Метод отрисовки предыдущей страницы.
	 */
	_getPrevPage() {
		if (this._pagesDict._currentPage > 1) this._pagesDict._currentPage--;

		const offset = this._pagesDict._currentPage * this._usersPerPage;

		const that = this;

		AjaxModule.doGet({
			callback(xhr) {
				const response = JSON.parse(xhr.responseText);
				that._boardElement.setAndRender(response);
			},
			path: `/leaderboard?offset=${offset}`,
		});
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
	
			AjaxModule.doGet({
				callback(xhr) {
					const response = JSON.parse(xhr.responseText);
					that._boardElement.setAndRender(response);
				},
				path: `/leaderboard?offset=${offset}`,
			});
		} 
	}

	/**
	 * Метод отрисовки страницы leader board с пагинацией.
	 */
	render() {
		const templateScript = `
			<p class="prev"><</p>
			<p class="next">></p>
        `;

		// console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		console.log(this._pagesDict);
		this._parentElement.innerHTML += template(this._pagesDict);

		console.log('page:',this._parentElement);

		const pageBox = this._parentElement.querySelector('.paginatorBox');
		const prevButton = this._parentElement.querySelector('.prev');
		const nextButton = this._parentElement.querySelector('.next');

		nextButton.addEventListener('click', () => {
			pageBox.innerHTML = '';
			this._getNextPage();
			this.render();
		});


		prevButton.addEventListener('click', () => {
			pageBox.innerHTML = '';
			this._getPrevPage();
			this.render();
		});
	}
}
