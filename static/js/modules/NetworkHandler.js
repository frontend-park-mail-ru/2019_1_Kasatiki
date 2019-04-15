/* eslint-disable import/prefer-default-export */

/**
 * Прототип класса с модулем проверки авторизации пользователя.
 */
const noop = () => null;

/**
 * Класс с методами отправки AJAX-запросов на сервер
 */
export default class NetworkHandler {
	_send({
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
<<<<<<< HEAD
				console.log(error);
				callback(response.status);
=======
				callback();
>>>>>>> origin/develop
			})
	}

	doGet({
		callback = noop,
		path = '/',
	} = {}) {
		this._send({
			callback,
			path,
			method : 'GET',
		}) 
	}

	doHead({
		callback = noop,
		path = '/',
	} = {}) {
		this._send({
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
		this._send({
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
		this._send({
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
		this._send({
			callback,
			path,
			method : 'DELETE',
			body,
		}) 
	}
}

window.NetworkHandler = new NetworkHandler;