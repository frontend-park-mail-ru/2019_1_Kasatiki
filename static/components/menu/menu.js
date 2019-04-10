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
                <h1 class="menu__title">ADV<a class="hate">HATER</a></h1>
                <div class="main-bar">
                    <button class="main-bar__item menu_btn" data-title="LEADERBOARD" data-section="leaderboard"><i class="fas fa-list-ul"></i></button>
                    <button class="main-bar__item menu_btn" data-title="PAYOUT" data-section="payout"><i class="fas fa-wallet"></i></button>
                    <button class="main-bar__item menu_btn" data-title="SHOP" data-section="shop"><i class="fas fa-shopping-cart"></i></button>
                </div>
                <div class="menu__profile">
                </div>
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
        
        const profile = this._parentElement.querySelector('.menu__profile');

        // this._parentElement.addEventListener('mouseover', (evt) => {
        //     const { target } = evt;


        //     if (target.className === 'btn-1') {
        //         console.log('back');
        //         return;
        //     }

        //     if (target.parentElement === profile || target === profile || 
        //         target.parentElement.className === 'profile-info') {

        //         console.log('profile)');

        //         profile.innerHTML = `
        //             <img src="./img/avatar.png" class="profile-avatar"></img>
        //             <div class="profile-info">
        //                 <h4 class="profile-nickname">evvFeburary</h4>
        //                 <h4 class="profile-score">2240 $</h4>
        //             </div>
        //             <button class="btn-1">1</button>
        //             <button class="btn-1">2</button>
        //         `
        //     }
        // });

        // this._parentElement.addEventListener('mouseout', (evt) => {
        //     const { target } = evt;

        //     if (target.className === 'btn-1') {
        //         console.log('back');
        //         return;
        //     }

        //     if (target.parentElement === profile || target === profile || 
        //         target.parentElement.className === 'profile-info') {

        //         console.log('profile out');

        //         profile.innerHTML = ``;
        //         profile.innerHTML = `
        //             <img src="./img/avatar.png" class="profile-avatar"></img>
        //             <div class="profile-info">
        //                 <h4 class="profile-nickname">evvFeburary</h4>
        //                 <h4 class="profile-score">2240 $</h4>
        //             </div>
        //         `
        //     }
        // });
    }

    run() {
        this._render();
    }
}