export default class ShopComponent {

    render() {
        const templateScript = `
            <div class="shop-background">
                <div class="shop-container">
                    <div class="shop__menu">
                        <div class="shop__menu-item">1</div>
                        <div class="shop__menu-item">2</div>
                        <div class="shop__menu-item">3</div>
                        <div class="shop__menu-item">4</div>
                        <div class="shop__menu-item">5</div>
                        <div class="shop__menu-item">6</div>
                    </div>
                    <div class="weapon__about">
                        <div claas="weapon__about-main">
                            <img src="/" alt="weapon" class="weapon__about-image">
                            <button class="weapon__about-info-purchase">Buy</button>
                        </div>
                        <div class="weapon__about-info">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tristique enim, quis interdum lectus. Cras vel metus accumsan, commodo massa ut, fermentum lorem. Phasellus tempor facilisis ligula pharetra venenatis. Aliquam vulputate sagittis dignissim. Morbi luctus id ligula vel maximus. Pellentesque quis ante vulputate, sagittis nisl vel, congue lectus. Morbi tellus erat, sollicitudin volutpat dignissim eu, porta blandit dolor.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        const template = Handlebars.compile(templateScript);		
        return template();
    }
    
}