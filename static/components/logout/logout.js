import GetAuthStatus from '../../modules/networkHandler.js';

export default class LogoutComponent {
    constructor(
        handler,
    ) {
        this._getAuthStatus = new GetAuthStatus();
        this._eventHandler = handler;
    }

    run(authStatus) {
        const that = this;
        if (authStatus) {
            that._getAuthStatus.doGet({
                callback(data) {
                    that._eventHandler.handle('menu', data.is_auth);
                },
                path : '/logout',
            }) 
        }
    }
}