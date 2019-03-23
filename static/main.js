/* eslint-disable import/extensions */
/* eslint-disable no-alert */

import eventHandler from './modules/eventListener.js';

import LoginComponent from '../components/login/login.js';
import SignUpComponent from '../components/signup/signup.js';
import BoardComponent from '../components/board/board.js';
import ProfileComponent from '../components/profile/profile.js';
import MenuComponent from '../components/menu/menu.js';
import LogoutComponent from '../components/logout/logout.js';

// Разименовывем необходимые элементы DOM'a
const app = document.getElementById('application');
app.innerHTML = ''

const handler = new eventHandler(app);


const functions = {
	signup : new SignUpComponent(handler, app),
	login : new LoginComponent(handler, app),
	leaderboard : new BoardComponent(app),
	profile : new ProfileComponent(handler, app),
	menu : new MenuComponent(app),
	logout: new LogoutComponent(handler),
}	

handler.setFunctions(functions);

handler.handle('menu');	
