const {AjaxModule} = window;

(function() {

    class validModule {
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

    window.validModule = new validModule();
})();   