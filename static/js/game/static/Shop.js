import StaticEssence from './StaticEssence.js';
import ShopComponent from '../../components/ShopComponent/ShopComponent.js'
import ShopView from '../../views/ShopView.js'


export default class Shop extends StaticEssence{
    constructor() {
        super(...arguments)

        this.playerInShop = false;
        this.shopOpenStatus = false;

        this.ctx;

        this.root = document.body;

        this.name = 'shop';
        this.shopDOM = new ShopComponent();

        this.weapons = [
            {
                id : 0,
                name : 'revolver',
                icon : "../../../icons/revolver.svg",
                cost : 200,
                fireRate : 500,
                damage : 25,
                about : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis tempus magna. Nunc eget porttitor turpis. Sed sagittis lacus vel ligula vehicula, id rhoncus ipsum gravida.',
            },
            {
                id : 1,
                name : 'ak-74',
                icon : "../../../icons/ak-74.svg",
                cost : 1200,
                fireRate : 200,
                damage : 27,
            },
            {
                id : 2,
                name : 'm-16',
                icon : "../../../icons/m-16.svg",
                cost : 1150,
                fireRate : 180,
                damage : 22,
            },
            {
                id : 3,
                name : 'shotgun',
                icon : "../../../icons/shotgun.svg",
                cost : 900,
                fireRate : 1000,
                damage : 7,
            },
            {
                id : 4,
                name : 'rpg',
                icon : "../../../icons/rpg.svg",
                cost : 5000,
                fireRate : 1000,
                damage : 100,
            },
        ]

        if (document.querySelector('.shop') === null) {
            this.shop = document.createElement('div');
            this.shop.className = 'shop';
            document.body.appendChild(this.shop);
        } else {
            this.shop = document.querySelector('.shop');
        }

        this.shopView = new ShopView(this.shop, this.weapons);
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

    open() {
        if (this.playerInShop) {
            this.shopOpenStatus = true;

            this.ctx.fillStyle = 'E3E3E3';
            this.ctx.fillRect(250, 300, 650, 600);

            if (this.shop.innerHTML === '') {
                this.shopView.show();
            }
        }
    }

    close() {
        this.shopOpenStatus = false;
        // console.log('Shop closed');
        this.shopView.hide();
    }
}