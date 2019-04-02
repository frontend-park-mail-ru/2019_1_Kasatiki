export default class choseComponent { 
    constructor(
        parentElement = document.body,
        authStatus = false,
    ) {
        this._parentElement = parentElement;
        this._authStatus = authStatus;
        this._choseItems = {};
    }

    _render() {
        const templateScript = `
            <div class="chose">
                <h1 class="chose__title">ADVHATER</h1>
                <div class="main-bar">
                    <button class="main-bar__item chose_btn" data-title="SIGNUP" data-section="signup"><i class="fas fa-user-plus"></i></button>
                    <button class="main-bar__item chose_btn" data-title="QUICK PO" data-section="chose"><i class="fas fa-wallet"></i></button>
                    <button class="main-bar__item chose_btn" data-title="LOGIN" data-section="login"><i class="fas fa-sign-in-alt"></i></button>
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