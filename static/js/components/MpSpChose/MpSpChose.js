export default class MpSpChose {
    render(isAuth) {
        let templateScript;
        if (isAuth) {
            templateScript = `
                <div class="MpSpChose">
                    <h1 class="MpSpChose__title">CHOSE MODE</h1>
                    <div class="MpSpChose__main-bar">
                        <button href="/play" class="main-bar__item sp_btn btn" data-title="SOLO" data-section="sp"><i href="play" class="fas fa-user"></i></button>
                        <button href="/lobby" class="main-bar__item btn" data-title="VS" data-section="mp"><i href="play" class="fas fa-user-friends"></i></button>
                        <button href="/" class="main-bar__item back_btn btn" data-title="" data-section="menu"><i class="fas fa-chevron-left"></i></i></button>                    
                    </div> 
                </div>
            `;
        } else {
            templateScript = `
                <div class="MpSpChose">
                    <h1 class="MpSpChose__title">CHOSE MODE</h1>
                    <div class="MpSpChose__main-bar">
                        <button href="/play" class="main-bar__item sp_btn btn" data-title="SOLO" data-section="sp"><i href="play" class="fas fa-user"></i></button>
                        <button href="/play" class="main-bar__item mp_btn_passive" data-title="VS" data-section="mp"><i href="play" class="fas fa-user-friends"></i></button>
                        <button href="/" class="main-bar__item back_btn btn" data-title="" data-section="menu"><i class="fas fa-chevron-left"></i></i></button>                    
                    </div> 
                </div>
            `;
        }

        
        const template = Handlebars.compile(templateScript);
		return template();
    }
}