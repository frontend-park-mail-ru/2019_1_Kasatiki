export default class LobbyComponent {
    /**
     * Функция, возвращающая строку в формате html с формой логина.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    render(data) {
        templateScript = `
            <div class="lobby">
                <h1 class="lobby-title">Multiplayer</h1>
                <div class="lobby-main-section">
                    <div class="lobby_communication-section">
                            <div class="lobby_communication-section_player">
                                <div class="lobby_communication-section_player-avatar">
                                    <img src="https://cdn2.iconfinder.com/data/icons/business-charts-red/512/account_user_people_business_money_office_login-512.png" class="lobby_communication-section_player-avatar-img" alt="avatar">
                                </div>
                                <div class="lobby_communication-section_player-nickname">
                                    <h2>Nickname</h2>
                                </div>
                                <div class="lobby_communication-section_player-statistic">

                                </div>
                                <div class="lobby_communication-section_player-bet">
                                    <h1 class="lobby_communication-section_player-1-bet-value">500</h1>
                                </div>
                            </div>
                            <div class="lobby_communication-section_chat"></div>
                            <div class="lobby_communication-section_player">
                                <div class="lobby_communication-section_player-avatar">
                                    <img src="https://cdn2.iconfinder.com/data/icons/business-charts-red/512/account_user_people_business_money_office_login-512.png" class="lobby_communication-section_player-avatar-img" alt="avatar">
                                </div>
                                <div class="lobby_communication-section_player-nickname">
                                    <h2>Nickname</h2>
                                </div>
                                <div class="lobby_communication-section_player-statistic"></div>
                                <div class="lobby_communication-section_player-bet">
                                    <h1 class="lobby_communication-section_player-2-bet-value">500</h1>
                                </div>
                            </div>
                        </div>
                    <div class="lobby_controll-section">
                        <div class="lobby_controll-section-inputs">
                            <input type="text" class="lobby_controll-section-inputs-value">
                            <button class="lobby_controll-section-inputs-placeBtn"></button>
                        </div>
                        <div class="lobby_controll-section-bet">
                            <h1 class="lobby_controll-section-bet-value">25498</h1>
                            <h3 class="lobby_controll-section-bet-tag">Total bet</h3>
                        </div>
                        <div class="lobby_controll-section-ready-section">
                            <button class="lobby_controll-section-ready-section-btn"><i class="fas fa-check"></i> Ready</button>
                        </div>
                    </div>
                </div>
                <div class="lobby-back">
                    <button class="lobby-back-btn"></button>
                </div>
            </div>
        `;

        const template = Handlebars.compile(templateScript);		
        return template();
    }
}
