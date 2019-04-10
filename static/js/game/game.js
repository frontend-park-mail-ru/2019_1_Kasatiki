export default class Game {
    constructor( 
        router,

        root = document.body
    ) {
        this.router;

        // Родительский узел DOM 
        this._root = root;

        // Параметры canvas
        this._canvas = document.createElement('canvas');

        // Размеры карты
        this.width;
        this.height;

        // Очко)
        this.score;

        // Массив объектов
        this.objects = {};
    }

    _renderCanvas() {

    }

    // ?? 
    _resizeConvas() {

    }

    // Инит метод : цикл -> отрисовка 
    run() {

    }

    defeat() {
        router.go('/defeat');
    }

    victory() {
        router.go('/win');
    }

}  