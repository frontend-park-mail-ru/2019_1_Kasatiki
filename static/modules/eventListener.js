import GetAuthStatus from './networkHandler.js';

/**
 * Прототип класса с модулем обработки всех кликов в приложении.
 */
export default class eventHandler {
    constructor(
        parentElement = document.body,
        functions = {},
    ) {
        this._getAuthStatus = new GetAuthStatus();
        this._functions = functions;
        this._parentElement = parentElement;
        
    }

    // Обработчик всех кликов в _parentElement
    // handleFunc(funcName = null, option = null) {
    //     const that = this;

    //     console.log('funcNAME' ,funcName, 'OPTION', option)

    //     if (funcName !== null) {
    //         this._getAuthStatus.doHead({
    //             callback(data) {
    //                 if (option === null) {
    //                     that._functions[funcName].run(data.is_auth);
    //                 } else {
    //                     that._functions[funcName].run(option);
    //                 }
    //             }, 
    //             path : '/isauth'
    //         }) 
    //     }
    // }
    
    handle(funcName = null, option = null) {
        const that = this;

        if (funcName !== null) {
            this._getAuthStatus.doHead({
                callback(data) {
                    if (option === null) {
                        that._functions[funcName].run(data.is_auth);
                    } else {
                        that._functions[funcName].run(option);
                    }
                }, 
                path : '/isauth'
            }) 
        }

        that._getAuthStatus.doHead({
            callback(data) {
                that._parentElement.addEventListener('click', (evt) => {
                    console.log('vnizu', data.is_auth);

                    const { target } = evt;
                
                    console.log('click on ', target, 'datasec: ', target.dataset.section);
                
                    // Если target является кнопкой
                    if (target instanceof HTMLButtonElement) {
                        if (target.dataset.section in that._functions) {
                            // Убираем все стандартные обработчики
                            evt.preventDefault();
                
                            const { section } = target.dataset;
                
                            console.log('vnizu v if', data.is_auth);

                            that._functions[section].run(data.is_auth);
                        }
                    }
                });
            }, 
            path : '/isauth'
        })
    }
}