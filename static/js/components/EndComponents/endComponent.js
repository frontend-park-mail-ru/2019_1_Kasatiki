export default class EditComponent {

    render(amount) {
        let templateScript = `
            <div class="end">
                <div class="end-message">
                    <h1>You earn:</h1>
                </div>
                <div class="end-earned-val">
                    <h1>{{amount}}</h1>
                </div>
                <button href="/" class="end-back-btn"><i class="fas fa-chevron-left"></i></button>
            </div>
        `;
        const template = Handlebars.compile(templateScript);		
        return template(data);
    }
}

