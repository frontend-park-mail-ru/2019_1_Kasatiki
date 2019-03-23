/**
 * Класс с методом render для отрисовки leader board.
 */
// eslint-disable-next-line import/prefer-default-export
export default class BoardComponent {
	/**
	 * Конструктор
	 * @param {Object} parentElement - Элемент DOM дерева,
	 * куда будет отрисовываться leader board.
	 */
	constructor({
		parentElement = document.body,
	} = {}) {
		this._parentElement = parentElement;
	}

	/**
	 * Геттер данных о пользователе.
	 */
	get data() {
		return this._usersArr;
	}

	/**
	 * Сеттер данных о пользователе.
	*/
	set data(usersArr = []) {
		this._usersArr = usersArr;
	}

	/**
	 * Метод для отрисоки leader board.
	 * @param {array} users - массив данных о пользователях.
	 */
	render(users) {
		console.log(users);
		// Итерируясь по юзерам, выводим строки таблицы
		const templateScript = `
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
        `;

		// console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		// console.log(template);
		this._parentElement.innerHTML += template(users);
	}
}
