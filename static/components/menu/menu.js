export default class MenuComponent {
    constructor(
        parentElement,
        authStatus = false,
    ) {
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
                // about: 'О приложении',
                profile: 'Профайл',
                logout: 'Выйти',
            };
        } else {
            that._menuItems = {
                signup: 'Регистрация',
                login: 'Логин',
                game: 'Играть',
                leaderboard: 'Таблица лидеров',
                // about: 'О приложении',
                profile: 'Профайл',
            };
        }
    }

    _render() {
        this._parentElement.innerHTML = '';

        // this._setMenuItems();

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
        const that = this;
        console.log('auth status (in menu):',  this._authStatus);
        
        if (this._authStatus) {
            that._menuItems = {
                game: 'Играть',
                leaderboard: 'Таблица лидеров',
                // about: 'О приложении',
                profile: 'Профайл',
                logout: 'Выйти',
            };
        } else {
            that._menuItems = {
                signup: 'Регистрация',
                login: 'Логин',
                game: 'Играть',
                leaderboard: 'Таблица лидеров',
                // about: 'О приложении',
                profile: 'Профайл',
            };
        }
        console.log(that._menuItems)

        that._render();
    }
}