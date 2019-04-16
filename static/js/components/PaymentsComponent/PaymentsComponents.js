export default class PaymentsComponent {
    /**
     * Функция, возвращающая строку в формате html с формой выплаты.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    render(isAuth) {
        let templateScript = ``;
		if (isAuth) {
			templateScript = `
                <div class="payments">
                    <h1 class="payments__title">Payments</h1>
                    <form class="payments__input-section" action="/payments" method="post" id="contact_form">
                        <input type="text" name="phone" class="payments__phonenumber" placeholder="9xxxxxxxxx">
                        <input type="text" name="amout" placeholder="100 $">
                        <button href="/"><i class="fas fa-angle-left"></i></button>
                        <button type="submit" id="form_button">Payout</button>
                    </form>
                </div>
            `;
		} else {
			templateScript = `
                <div class="chose">
                    <h1 class="chose__title">ADVHATER</h1>
                    <div class="main-bar">
                        <button href="/signup" class="main-bar__item chose_btn" data-title="SIGNUP" data-section="signup"><i href="/signup" class="fas fa-user-plus"></i></button>
                        <button href="/login" class="main-bar__item chose_btn" data-title="LOGIN" data-section="login"><i href="/login" class="fas fa-sign-in-alt"></i></button>
                    </div> 
                </div>
			`;
		}
		const template = Handlebars.compile(templateScript);		
        return template();
	}
}