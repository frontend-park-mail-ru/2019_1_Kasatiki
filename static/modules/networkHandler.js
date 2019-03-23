/* eslint-disable import/prefer-default-export */

/**
 * Прототип класса с модулем проверки авторизации пользователя.
 */
const noop = () => null;
	/**
	 * Класс с методами отправки AJAX-запросов на сервер
	 */

	export default class GetAuthStatus {
		_getSatus({
			callback = noop, 
			path = '/',
			method = 'GET',
			body,
		} = {}) {
			const options = {
				method,
				// Настройка CORS
				headers : {
					// Запрещаем открытие iframe на сайте
					'X-Frame-Options' : 'DENY',
					'Content-Type' : 'application/json',
					// // Мы разворачиваемся на этом домене
					'Access-Control-Allow-Origin' : 'http://advhater.ru/',
					'Access-Control-Allow-Credentials' : true,
					// Допускаем только GET, POST, DELETE, HEAD запросы
					'Access-Control-Request-Method' : 'POST, GET, PUT, DELETE, HEAD,',
					// Для "непростых запросов"
					// 'Origin' : '',
				},
				mode : 'cors',
				cache : 'default',
				body,
			}

			fetch(path, options)
				.then(function (response) {
					if (response.status !== 200) {
						throw new Error('Wrong network response')
					} 
					return response.json();
				})
				.then(function (data) {
					callback(data);
				})
				.catch((error) => {
					console.error('response status !== 200!, error:',error.message);
				})
			}

		doGet({
			callback = noop,
			path = '/',
		} = {}) {
			this._getSatus({
				callback,
				path,
				method : 'GET',
			}) 
		}

		doHead({
			callback = noop,
			path = '/',
		} = {}) {
			this._getSatus({
				callback,
				path,
				method : 'HEAD',
			}) 
		}

		doPost({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._getSatus({
				callback,
				path,
				method : 'POST',
				body,
			}) 
		}


		doPut({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._getSatus({
				callback,
				path,
				method : 'PUT',
				body,
			}) 
		}


		doDelete({
			callback = noop,
			path = '/',
			body = {},
		} = {}) {
			this._getSatus({
				callback,
				path,
				method : 'DELETE',
				body,
			}) 
		}
	}



