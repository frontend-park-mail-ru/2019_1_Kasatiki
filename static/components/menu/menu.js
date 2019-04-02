export default class menuComponent { 
    constructor(
        parentElement = document.body,
        authStatus = false,
    ) {
        this._parentElement = parentElement;
        this._authStatus = authStatus;
        this._menuItems = {};
    }

    _render() {
        const templateScript = `
            <div class="menu">
                <h1 class="menu__title">ADVHATER</h1>
                <div class="main-bar">
                    <button class="main-bar__item menu_btn" data-title="LEADERBOARD" data-section="leaderboard"><i class="fas fa-list-ul"></i></button>
                    <button class="main-bar__item menu_btn" data-title="PAYOUT" data-section="signup"><i class="fas fa-wallet"></i></button>
                    <button class="main-bar__item menu_btn" data-title="SHOP" data-section="login"><i class="fas fa-shopping-cart"></i></button>
                </div>
                <div class="menu__profile"></div>
                <button class="menu__play-btn data-section="play"><i class="fas fa-play"></i></button>
                <div class="options">
                    <a href="#" class="options__link">Report bug</a>
                    <a href="#" class="options__link">Help</a>
                    <a href="#" class="options__link">Hate with us!</a>
                </div>  
            </div>
        `;

        const template = Handlebars.compile(templateScript);
		this._parentElement.innerHTML = template();
    }

    run() {
        this._render();
    }
}