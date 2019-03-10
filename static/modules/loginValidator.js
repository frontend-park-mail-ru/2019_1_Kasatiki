const {AjaxModule} = window;

(function() {

    class ValidModule {

        validUser() {
            AjaxModule.doGet({	
                callback(xhr) {
                    const res = JSON.parse(xhr.responseText);
                    return res.is_auth;
                },
                path : '/isauth',
            });
        }
        
    }

	window.ValidModule = new ValidModule();
})();