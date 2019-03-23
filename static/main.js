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

const signup = new SignUpComponent(app);
const login = new LoginComponent(app);
const leaderboard = new BoardComponent(app);
const profile = new ProfileComponent(app);
const menu = new MenuComponent(app);
const logout = new LogoutComponent(app);

const functions = {
	signup : signup,
	login : login,
	leaderboard : leaderboard,
	profile : profile,
	menu : menu,
	logout: logout,
}

const handler = new eventHandler(app, functions);

handler.handle('menu');	
