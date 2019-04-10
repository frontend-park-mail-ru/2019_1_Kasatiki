import GetAuthStatus from './networkHandler.js';

/**
 * Прототип класса с модулем обработки всех кликов в приложении.
 */
export default class eventHandler {
    constructor(
        parentElement = document.body,
    ) {
        this._getAuthStatus = new GetAuthStatus();
        this._functions = {};
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

    setFunctions(funcs = {}) {
        this._functions = funcs;
    }
    
    handle(funcName = null, option = null) {
        const that = this;

        if (funcName !== null) {
            this._getAuthStatus.doGet({
                callback(data) {
                    if (option === null) {
                        that._functions[funcName].run(data.is_auth);
                    } else {
                        that._functions[funcName].run(data.is_auth, option);
                    }
                }, 
                path : '/isauth'
            }) 
        }

        that._parentElement.addEventListener('click', (evt) => {
            const { target } = evt;
        
            console.log('click on ', target, 'datasec: ', target.dataset.section);
        
            // Если target является кнопкой
            if (target instanceof HTMLButtonElement) {
                if (target.dataset.section in that._functions) {
                    // Убираем все стандартные обработчики
                    evt.preventDefault();
        
                    const { section } = target.dataset;
        
                    that._getAuthStatus.doGet({
                        callback(data) {
                            // console.log('handler got response:', data.is_auth, 'section:', section);
                            that._functions[section].run(data.is_auth);
                        }, 
                        path : '/isauth'
                    })
                } else if (target.parentElement.dataset.section in that._functions) {
                    evt.preventDefault();

                    console.log('not a button:', target.parentElement);
        
                    const { section } = target.parentElement.dataset;
        
                    that._getAuthStatus.doGet({
                        callback(data) {
                            // console.log('handler got response:', data.is_auth, 'section:', section);
                            that._functions[section].run(data.is_auth);
                        }, 
                        path : '/isauth'
                    })
                }
            }
        });
    }
}