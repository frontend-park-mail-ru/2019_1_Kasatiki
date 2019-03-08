'use strict';

const fs = require('fs');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(body.json());
app.use(cookie());


const users = { user : [
	{
		email: 'rakhimgaliev56@gmail.com',
		password: 'password',
		age: 18,
		score: 322,
	},

	{
		email: 'solovevgel0@gmail.com',
		password: 'password',
		age: 20,
		score: 228,
	},

	{
		email: 'sadfasdf0@gmail.com',
		password: 'password',
		age: 21561,
		score: 12,
	},
	{
		email: 'aaa@mail.ru',
		password: '1',
		age: 1,
		score: 1,
	}
	]
};

const ids = {};

app.post('/signup', function (req, res) {
	const password = req.body.password;
	const email = req.body.email;
	const age = req.body.age;

	if (
		!password || !email || !age ||
		!password.match(/^\S{4,}$/) ||
		!email.match(/@/) ||
		!(typeof age === 'number' && age > 10 && age < 100)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {password, email, age, score: 0};
	ids[id] = email;
	users[email] = user;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login', function (req, res) {
	const email = req.body.email;
	const password = req.body.password;

	console.log(email);
	console.log(password);

	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}


	const id = uuid();
	ids[id] = email;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.get('/me', function (req, res) {
	const id = req.cookies['sessionid'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].score += 1;

	res.json(users[email]);
});

app.get('/users', function (req, res) {

	// const db = fs.readFile('./server/data_base.txt', {encoding: 'utf8'}, (err, users) => {
		
	// 	if (err) {
	// 		console.log(err);
	// 		return;
	// 	}

	// 	console.log (users);

	// 	const splitUsers = users.split('\n');
	// 	splitUsers.forEach(element => {
	// 		console.log(element);
	// 	});

	// 	let res = splitUsers.map( (element, idx, splitUsers) => {
	// 		element = element.split(' ');
	// 		return {
	// 			login : againSplit[0],
	// 			email : againSplit[1],
	// 			pass : againSplit[2],
	// 			age : againSplit[3],
	// 			score : againSplit[4],
	// 		}
	// 	});

	// 	console.log(res);

	// 	res.json(res);
	// });

	const scorelist = Object.values(users)
	.sort((l, r) => r.score - l.score)
	.map(user => {
		return {
			email: user.email,
			age: user.age,
			score: user.score,
		}
	});

	res.json(scorelist);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});