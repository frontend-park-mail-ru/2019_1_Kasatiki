import StaticEssence from './StaticEssence.js';
import ShopComponent from '../../components/ShopComponent/ShopComponent.js'


export default class Shop extends StaticEssence{
    constructor() {
        super(...arguments)

        this.playerInShop = false;
        this.shopOpenStatus = false;

        this.ctx;

        this.root = document.body;

        this.name = 'shop';

        this.shopDOM = new ShopComponent();
        this.shop = document.createElement('div');
        this.shop.className = 'shop';
        document.body.appendChild(this.shop);
    }

    render(ctx) {
        this.ctx = ctx;
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, this.xSize, this.ySize);
        ctx.fillStyle = "#C733FF";
        ctx.fill();
        ctx.closePath();
        
        if (this.playerInShop && !this.shopOpenStatus) {
            ctx.fillStyle = "#000";
            ctx.font = "italic 20pt Arial";
            ctx.fillText('Press E to Shop', 600, 300);
        }
    }

    logic() {

    }

    interact() {
        this.playerInShop = true;
    }

    _createShopDOM() {
        this.shop.innerHTML = this.shopDOM.render();
    }

    open() {
        if (this.playerInShop) {
            this.shopOpenStatus = true;

            this.ctx.fillStyle = 'E3E3E3';
            this.ctx.fillRect(250, 300, 650, 600);

            if (this.shop.innerHTML === '') {
                this._createShopDOM();
            }
        }
    }

    close() {
        this.shopOpenStatus = false;
        console.log('Shop closed');
        this.shop.innerHTML = '';
    }
}