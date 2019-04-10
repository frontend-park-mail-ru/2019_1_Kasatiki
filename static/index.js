import Router from './js/modules/Router.js';
import './js/modules/NetworkHandler.js';

import MenuView from './js/views/MenuView.js';
import LoginView from './js/views/LoginView.js';
import LogoutView from './js/views/LogoutView.js';
import SignupView from './js/views/SignupView.js';
import CountdownView from './js/views/CountdownView.js';

const app = document.getElementById('app');

const router = new Router(app);
router.add('/', MenuView);
router.add('/countdown', CountdownView);
router.add('/login', LoginView);
router.add('/logout', LogoutView);
router.add('/signup', SignupView);
router.run();