// eslint-disable-next-line import/extensions
import BoardComponent from '../board/board.js';

const { AjaxModule } = window;

// Handlebars.registerHelper('iff', function(a, operator, b, opts) {
//     let bool = false;
//     switch(operator) {
//         case '!=':
//             bool = a != b;
//             break;
//         case '==':
//             bool = a == b;
//             break;
//         case '>':
//             bool = a > b;
//             break;
//         case '<':
//             bool = a < b;
//             break;
//         default:
//             throw "Unknown operator " + operator;
//     }

//     if (bool) {
//         return opts.fn(this);
//     } else {
//         return opts.inverse(this);
//     }
// });

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
		parentElement = document.createElement('div.main'),
		usersPerPage = 1,
		totalPages = 1,
	} = {}) {
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

		const board = new BoardComponent({ parentElement: this._parentElement });

		const that = this;

		AjaxModule.doGet({
			callback(xhr) {
				const res = JSON.parse(xhr.responseText);
				that._parentElement.innerHTML = '';
				board.render(res);
				that.renderPaginator();
			},
			path: `/leaderboard?offset=${offset}`,
		});
	}

	/**
	 * Метод отрисовки следующей страницы.
	 */
	_getNextPage() {
		if (this._pagesDict._currentPage < this._pagesDict._totalPages) this._pagesDict._currentPage++;

		const offset = this._pagesDict._currentPage * this._usersPerPage;
		console.log(offset);

		const board = new BoardComponent({ parentElement: this._parentElement });

		const that = this;

		AjaxModule.doGet({
			callback(xhr) {
				const res = JSON.parse(xhr.responseText);
				that._parentElement.innerHTML = '';
				board.render(res);
				that.renderPaginator();
			},
			path: `/leaderboard?offset=${offset}`,
		});
	}

	/**
	 * Метод отрисовки страницы leader board с пагинацией.
	 */
	renderPaginator() {
		const templateScript = `
            <div class="paginatorBox">
                <p class="prev"><</p>
                <p class="next">></p>
            </div>

            <button data-section="menu" class="btn">Назад</button>
        `;


		// console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		console.log(this._pagesDict);
		this._parentElement.innerHTML += template(this._pagesDict);

		const pageBox = this._parentElement.querySelector('.paginatorBox');
		// console.log(pageBox);
		const prevButton = this._parentElement.querySelector('.prev');
		const nextButton = this._parentElement.querySelector('.next');

		nextButton.addEventListener('click', () => {
			pageBox.innerHTML = '';
			this._getNextPage();
			this.renderPaginator();
		});


		prevButton.addEventListener('click', () => {
			pageBox.innerHTML = '';
			this._getPrevPage();
			this.renderPaginator();
		});
	}
}
