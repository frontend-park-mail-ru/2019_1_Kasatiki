export default class PaymentsComponent {
    /**
     * Функция, возвращающая строку в формате html с формой выплаты.
     * @param {boolean} isAuth - Статус авторизации пользователя.
     */
    render(data) {
        let templateScript = ``;
		if (typeof(data) == 'object') {
        // if (true) {
			templateScript = `
                <div class="payments__status-section">
                    <div class="payments__status-section-container"></div>
                </div>
                <div class="payments">
                    <h1 class="payments__title">Payments</h1>
                    <h2 class="">Balance {{points}}$</h2>
                    <form class="payments__input-section" onsubmit="this.send()" method="post" id="contact_form" required="">
                        <div class="payments__input-border">
                            <input class="payments__input-section-input" type="text" name="phone" class="payments__phonenumber" placeholder="9xxxxxxxxx" required="">
                        </div>
                        <div class="payments__input-border">
                            <input class="payments__input-section-input" type="text" name="amount" placeholder="100 $">
                        </div>
                        <div class="payments__input-section-error-section"></div>
                        <button href="/payout" class="payments__input-section-submit" type="submit" id="form_button">Submit</button>
                        <button href="/" class="payments__input-section-submit" ><i class="fas fa-angle-left"></i></button>
                    </form>
                </div>
            `;
		} else {
			templateScript = `
                <div class="chose">
                    <h1 class="chose__title">Payment</h1>
                    <div class="main-bar">
                        <button href="/signup" class="main-bar__item chose_btn_pay" data-title="SIGNUP" data-section="signup"><i href="/signup" class="fas fa-user-plus"></i></button>
                        <button href="/login" class="main-bar__item chose_btn_pay" data-title="LOGIN" data-section="login"><i href="/login" class="fas fa-sign-in-alt"></i></button>
                    </div> 
                    <h3 class="chose__title">login or signup please</h3>
                </div>
			`;
		}
		const template = Handlebars.compile(templateScript);		
        return template(data);
    }
}