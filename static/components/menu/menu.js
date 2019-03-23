export default class MenuComponent {
    constructor(
        parentElement = document.getElementsByClassName("app"),
        authStatus = false,
    ) {
        // this._handler = handler;
        this._parentElement = parentElement;
        this._authStatus = authStatus;
        this._menuItems = {};
    }

    // Разное меню для залогиненых/разлогиненых пользователей
    _setMenuItems() {
        const that = this;
        if (that._authStatus) {
            that._menuItems = {
                game: 'Играть',
                leaderboard: 'Таблица лидеров',
                about: 'О приложении',
                profile: 'Профайл',
                logout: 'Выйти',
            };
        } else {
            that._menuItems = {
                // signup: 'Регистрация',
                login: 'Логин',
                // game: 'Играть',
                leaderboard: 'Таблица лидеров',
                // about: 'О приложении',
                profile: 'Профайл',
            };
        }
    }

    _render() {
        console.log("render menu with status:",this._authStatus);
        this._parentElement.innerHTML = '';

        const templateScript = `
            <div class="menu">
                <h1 class="title">Main menu</h1>
                {{#each .}}
                    <button class="btn" data-section="{{@key}}">{{this}}</button>
                {{/each}}
            </div>
        `;

        const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML = template(this._menuItems);
    }

    run(authStatus) {
        this._authStatus = authStatus;
        this._setMenuItems();
        this._render();
    }
}