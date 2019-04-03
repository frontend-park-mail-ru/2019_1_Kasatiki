/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

/**
 * Класс со всмопогательными функциями для отрисовки элементов дома.
 */
export default class HelperComponent {
	/**
	 * Создание input ячейки.
	 * @param {node} object - объект DOM-дерева.
	 * @param {string} name - имя элемента в DOM-дереве.
	 * @param {string} type
	 * @param {string} placeholder
	 * @param {string} className - класс элемента(css).
	 */
	createInput(object, name, type, placeholder, className) {
		const optionsDict = {
			name,
			type,
			placeholder,
			className,
		};

		const templateScript = `
            <input name="{{name}}" type="{{type}}" placeholder="{{placeholder}}" class="{{className}}">
        `;

		// console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		// console.log(template);
		object.innerHTML += template(optionsDict);
		// eslint-disable-next-line indent
    }

	/**
	 * Создание кнопки.
	 * @param {node} object - объект DOM-дерева.
	 * @param {string} sectionName - название секции в DOM-дереве.
	 * @param {string} className - класс элемента(css).
	 * @param {string} textContent - текст в кнопке.
	 */
	createButton(object, sectionName, className, textContent) {
		const optionsDict = {
			sectionName,
			textContent,
			className,
		};

		const templateScript = `
            <button data-section="{{sectionName}}" class="{{className}}">{{textContent}}</button>
        `;

		// console.log(templateScript);
		const template = Handlebars.compile(templateScript);
		// console.log(template);
		object.innerHTML += template(optionsDict);
	}

	/**
	 * Создание заголовка.
	 * @param {node} parentObject - объект DOM-дерева, куда будет выводиться текст.
	 * @param {*} text - текст заголовка.
	 */
	createTitle(parentObject, text) {
		const optionsDict = {
			text,
		};

		const templateScript = `
            <div class="title">
                <h1>{{text}}</h1>
            </div>
        `;

		const template = Handlebars.compile(templateScript);
		parentObject.innerHTML += template(optionsDict);
	}
}
