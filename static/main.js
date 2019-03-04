console.log("Server started");

const users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 100500,
	},
	's.volodin@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		password: 'password',
		age: 21,
		score: 72,
	},
};

// const users = {
// 	firstUser: "Fread",
// 	secondUser: "Jhon"
// };

// Разименовывем необходимые элементы DOM'a
const app = document.getElementById("application");

const header = document.createElement('div');
header.dataset.section = "header";
app.appendChild(header);

const side = document.createElement('div');
side.dataset.section = "sidebar";
app.appendChild(side);

const main = document.createElement('div');
main.className = "main";
app.appendChild(main);

// Вызывается функциями login, signUp и тд для общения с сервером
function ajax (callback, method, path, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.withCredentials = true;

	if (body) {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

	xhr.onreadystatechange = function () {
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

// Вспомогательные функции (их и будем писать/исправлять/дополнять)
function createTitle(text) {
	const title = document.createElement('div');
	title.className = 'title';
	const title_txt = document.createElement('h1');
	title_txt.textContent = text;

	main.appendChild(title)
	title.appendChild(title_txt);
}

// Объеект, к которому добавится кнопка; sectionName, className, Текст кнопки
function createButton(object, sectionName, className, textContent) {
	const btn = document.createElement('button');
	btn.dataset.section = sectionName;
	btn.textContent = sectionName;
	btn.className = className;
	btn.textContent = textContent;
	object.appendChild(btn);
}

function createForm(object, sectionName, className, formAction) {
	const form = document.createElement('input');
	form.dataset.section = sectionName;
	form.placeholder = formAction;
	form.className = className;
	form.action = formAction;
	object.append(form);
}

function createInput(object, name, type, placeholder, className) {
	const input = document.createElement('input');

	input.name = name;
	input.type = type;
	input.placeholder = placeholder;
	input.className = className;

	object.appendChild(input);
}

// Основные функции, отвечают за логику работы фронта/генерирование контента и тд
function createMenu() {
	const menuItems = {
		signup: 'Регистрация',
		login: 'Логин',
		game: 'Играть',
		leaderboard: 'Таблица лидеров',
		about: 'О приложении',
		profile: 'Профайл',
	};

	main.innerHTML = '';
	createTitle('Main menu');

	const menu = document.createElement('div');
	menu.className = 'menu';
	main.appendChild(menu);

	const menuStyle = document.createElement('link');
	menuStyle.rel = 'stylesheet'
	menuStyle.href = 'styles/menu.css';

	// poka hz kak eto
	header.appendChild(menuStyle);

	Object.keys(menuItems).forEach( (key, value) => {
		createButton(menu, key, 'btn', menuItems[key]);
	});
}

function createLogin() {
	main.innerHTML = '';

	createTitle('Login');

	const signInSection = document.createElement('section');
	signInSection.className = 'menu';
	signInSection.dataset.sectionName = 'login';

	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			className: 'loginForm form'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			className: 'passForm form'
		},
		{
			name: 'submit',
			type: 'submit',
			className: 'submit btn'
		}
	];

	inputs.forEach(function (item) {
		createInput(form, 
			item.name,
			item.type, 
			item.placeholder, 
			item.className
		);
	});

	signInSection.appendChild(form);

	// createInput(menu, 'loginForm', 'text', 'email', 'emailForm form');
	// createInput(menu, 'passForm', 'text', 'pass', 'passForm form');
	// createButton(menu, 'submit', 'submit btn', 'Submit');
	// createButton(menu, 'menu', 'menu btn', 'Back');

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const password = form.elements[ 'password' ].value;

		ajax(function(xhr) {
			main.innerHTML = '';
			createProfile();
		}, 'POST', '/login', {
			email: email,
			password: password
		});
	});

	main.appendChild(signInSection);
	createButton(form, 'menu', 'menu btn', 'Назад');
}

function createSignup() {
	main.innerHTML = '';

	createTitle('Sign Up');

	const signUpSection = document.createElement('section');
	signUpSection.className = 'menu';	
	signUpSection.dataset.sectionName = 'sign_up';

	const form = document.createElement('form');

	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			className: 'loginForm form'
		},
		{
			name: 'age',
			type: 'number',
			placeholder: 'Your Age',
			className: 'ageForm form'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			className: 'passForm form'
		},
		{
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Repeat Password',
			className: 'passForm form'
		},
		{
			name: 'submit',
			type: 'submit',
			className: 'submit btn'
		}
	];

	inputs.forEach(function (item) {
		createInput(form,
			item.name,
			item.type, 
			item.placeholder, 
			item.className
		);
	});

	signUpSection.appendChild(form);

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const email = form.elements[ 'email' ].value;
		const age = parseInt(form.elements[ 'age' ].value);
		const password = form.elements[ 'password' ].value;
		const password_repeat = form.elements[ 'password_repeat' ].value;

		if (password !== password_repeat) {
			alert('Passwords is not equals');

			return;
		}

		ajax(function (xhr) {
			main.innerHTML = '';
			createProfile();
		}, 'POST', '/signup', {
			email: email,
			age: age,
			password: password
		});
	});

	main.appendChild(signUpSection);
	createButton(form, 'menu', 'menu btn', 'Назад');
}

function createProfile(me) {
	const profileSection = document.createElement('section');
	profileSection.className = 'menu';
	profileSection.dataset.section = 'profile';

	createTitle("Profile");

	if (me) {
		const menu = document.createElement('div');
		menu.className = 'menu';

		const div1 = document.createElement('div');
		div1.textContent = `Email ${me.email}`;
		const div2 = document.createElement('div');
		div2.textContent = `Age ${me.age}`;
		const div3 = document.createElement('div');
		div3.textContent = `Score ${me.score}`;
		
		menu.appendChild(div1);
		menu.appendChild(div2);
		menu.appendChild(div3);

		profileSection.appendChild(menu);
	} else {
		ajax(function(xhr) {
			if (!xhr.responseText) {
				alert('Unauthorized');
				main.innerHTML = '';
				createMenu();
				return;
			}

			const user = JSON.parse(xhr.responseText);
			main.innerHTML = '';
			createProfile(user);;
		}, 'GET', '/me')
	}

	main.appendChild(profileSection);
	createButton(profileSection, 'menu', 'btn', 'Back');
	
}

function createGame() {
	main.innerHTML = '';

	const menu = document.createElement('div');
	menu.className = 'gameBlock';
	main.appendChild(menu);

	const canvas = document.createElement('canvas');
	canvas.id = 'gameCanvas';
	canvas.width = 700;
	canvas.height = 700;
	menu.appendChild(canvas);

	const buf = document.getElementById('gamejs');
	if (buf !== null) {
		alert('got!');
	}

	const gameLogic = document.createElement('script');
	gameLogic.id = "gamejs";
	gameLogic.src = '/game.js'
	main.appendChild(gameLogic);

	createButton(menu, 'menu', 'btn', 'Back');
}

function createLeaderboard(users) {
	main.innerHTML = '';
	createTitle('Leaderboard');

	const leaderboard = document.createElement('div');
	leaderboard.dataset.section = 'leaderboard';
	leaderboard.className = 'menu';

	if (users) {
		const table = document.createElement('table');
		table.className = 'leadersTable'
		const thead = document.createElement('thead');
		thead.innerHTML = `
		<tr>
			<th>Email</th>
			<th>Age</th>
			<th>Score</th>
		</th>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		for (let key in users) {
			const email = users[key].email;
			const age = users[key].age;
			const score = users[key].score;

			console.log(email, age, score);

			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
			const tdScore = document.createElement('td');

			tdEmail.textContent = email;
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			leaderboard.appendChild(table);
			main.appendChild(leaderboard);
		};
	} else {
		console.log('data loading, please wait');
		ajax( (xhr) => {
			const users = JSON.parse(xhr.responseText);
			createLeaderboard(users);
		}, 'GET', '/users');
	};
	createButton(leaderboard, 'menu', 'btn', 'Back');
}

function createAbout() {

}


// Главный блок: создаем меню 
createMenu();

// Карта функций, сюда будем подгруать новые функции
const functions = {
	menu: createMenu,

	// Menu elements
	signup: createSignup,
	login: createLogin,
	game: createGame,
	leaderboard: createLeaderboard,
	profile: createProfile,
	// about: createAbout,


	// Other functions
	title: createTitle,
};

// Обработчик всех евентов в DOM'е
app.addEventListener('click', (evt) => {

	const target = evt.target;

	// Если target является кнопкой 
	if (target instanceof HTMLButtonElement) {
		// Убираем все стандартные обработчики	
		evt.preventDefault();

		const section = target.dataset.section;

		functions[section]();
	};
});