import GetAuthStatus from '../../modules/networkHandler.js';

export default class LogoutComponent {
    constructor() {
        this._getAuthStatus = new GetAuthStatus();
    }

    run() {
        this._getAuthStatus.doDelete({
            callback(data) {
                
            },
            path : '/logout'
        }) 
    }
}