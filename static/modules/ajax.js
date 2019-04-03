(function() {

	const noop = () => null;
	/**
	 * Класс с методами отправки AJAX-запросов на сервер
	 */
	class AjaxModule {
		/**
		 * Анонимная функция оправки AJAX-запроса.
		 * @param {function} callback - callback-функция.
		 * @param {string} method - метод запроса.
		 * @param {string} path - путь запроса.
		 * @param {string} body - тело запроса.
		 */
		_ajax({
			callback = noop,
			method = 'GET',
			path = '/',
			body = {},
		} = {}) {
			const xhr = new XMLHttpRequest();
			xhr.open(method, path, true);
			xhr.withCredentials = true;

			// Настравиваем безопасность
			// Запрет на открытие iframe (любых)
			xhr.setRequestHeader('X-Frame-Options', 'DENY');
			// Работа с токеном (CSRF)
			if (this._csrfToken !== undefined) {
				xhr.setRequestHeader('X-CSRF-Token', this._csrfToken);
			}

			if (body) {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			}

			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 4) {
					return;
				}

				callback(xhr);
			};

			if (body) {
				xhr.send(JSON.stringify(body));
			} else {
				xhr.send();
			}
		}

		/**
		 * @param {string} tokenValue - сеттер csrf-токена.
		 */
		set token(tokenValue) {
			this._csrfToken = tokenValue;
		}

		/**
		 * Метод отправки GEt-запроса.
		 * @param {function} callback - callback-функция.
		 * @param {string} path - путь запроса.
		 * @param {string} body - тело запроса.
		 */
		doGet({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'GET',
			});
		}

		/**
		 * Метод оправки PUT-запроса.
		 * @param {function} callback - callback-функция.
		 * @param {string} path - путь запроса.
		 * @param {string} body - тело запроса.
		 */
		doPut({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'PUT',
			});
		}

		/**
		 * Метод оправки POST-запроса.
		 * @param {function} callback - callback-функция.
		 * @param {string} path - путь запроса.
		 * @param {string} body - тело запроса.
		 */
		doPost({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'POST',
			});
		}

		/**
		 * Метод оправки DELETE-запроса.
		 * @param {function} callback - callback-функция.
		 * @param {string} path - путь запроса.
		 * @param {string} body - тело запроса.
		 */
		doDelete({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._ajax({
				callback,
				path,
				body,
				method: 'DELETE',
			});
		}
	}
	window.AjaxModule = new AjaxModule();
})();
