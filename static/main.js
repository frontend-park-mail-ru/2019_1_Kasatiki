/* eslint-disable import/extensions */
/* eslint-disable no-alert */

import eventHandler from './modules/eventListener.js';

import LoginComponent from '../components/login/login.js';
import SignUpComponent from '../components/signup/signup.js';
import BoardComponent from '../components/board/board.js';
import ProfileComponent from '../components/profile/profile.js';
import menuComponent from '../components/menu/menu.js';
import LogoutComponent from '../components/logout/logout.js';
import CountdownComponent from '../components/countdown/countdown.js'
import choseComponent from '../components/chose/chose.js'


const handler = new eventHandler();

const functions = {
	signup : new SignUpComponent(),
	login : new LoginComponent(),
	leaderboard : new BoardComponent(),
	// profile : new ProfileComponent(handler, app),
	menu : new menuComponent(),
	chose: new choseComponent(),
	// logout: new LogoutComponent(handler),
}	

handler.setFunctions(functions);
handler.handle();

const countdown = new CountdownComponent(handler);
<<<<<<< HEAD

=======
>>>>>>> origin/dev
const menu = new menuComponent();


countdown.run();

// menu.run();
