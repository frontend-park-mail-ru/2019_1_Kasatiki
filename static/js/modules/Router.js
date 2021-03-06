import Ws from './ws.js'

export default class Router {
    /**
     * Конструктор роутера.
     * @param {HTMLelement} app 
     * @param {Map} routes - мапа {'string': Object}, Object - вьюха
     */
    constructor(
        app = document.body,
    ) {
        this.app = app;
        this.routes = {};
        // this.ws = new Ws(
        //     document.body,
        // );
    }

    run() {
        this.go(window.location.pathname);
        // this.go('/leaderboard?offset=3');

        this.app.addEventListener('click', (event) => {
            event.preventDefault();
            this.go(event.target.getAttribute('href'));
        })

        // Обрабатывает события при клике назад/вперед
        window.addEventListener('popstate', () => {
            this.go(window.location.pathname);
        });
    }

    /**
     * Функция добавления нового маршрута.
     * @param {string} path 
     * @param {Object} _renderObject - Вьюшка
     */
    add(path, _renderObject) {
        let renderObject = new _renderObject(this.app, this);
        this.routes[path] = renderObject;
    }

    /**
     * Функция перехода по пути path
     * @param {string} path 
     */
    go(path) {
        let urlData = this._parseUrl(path);
        console.log(urlData);
        path = urlData.pathname;
        /*
            Если тебе нужны собвственные addEventListener-ы,
            то вместо того, чтобы создавать новые, ты можешь
            добававить маршрут во вьюхе в this.specialRoutes={}.
            Здесь (ниже) будет вызываться функция, соответсвующая этому маршруту.
            Идея заключалась в том, чтобы не создавать лишних eventListener-ов.
            А можешь забить и создать собвственный eventListener во вьюхе))
        */
        if (typeof this.currentRoute !== 'undefined') {
            if (typeof this.currentRoute.specialRoutes[path] !== 'undefined') {
                this.currentRoute.specialRoutes[path](this.currentRoute);
                return;
            }
        }

        let route = this.routes[path];

        if (!route) {
            return;
        }
        if (window.location.pathname !==  urlData.href) {
            window.history.pushState(null, '', urlData.href);
        }

        /**
         * Сохраняю маршрут, который должен будет показаться на экран.
         * Используется пока только в функции go(path);
         */

        this.currentRoute = route;
        route.show(urlData);
    }

    _parseUrl(url) {
        url = url || this.href;
        let pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
        let rx = new RegExp(pattern); 
        let parts = rx.exec(url);

        return {
            href: parts[0] || "",
            protocol: parts[1] || "",
            host: parts[4] || "",
            hostname: parts[5] || "",
            port: parts[6] || "",
            pathname: parts[7] || "/",
            search: parts[8] || "",
            hash: parts[10] || "",
        }
    }
}
