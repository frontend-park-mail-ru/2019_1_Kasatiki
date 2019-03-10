const {AjaxModule} = window;

export class profileComponent {
    constructor({
        parentElement = document.body,
    } = {}) {
        this._parentElement = parentElement;
        this._editCheck = false;
    }

    get data() {
        return this._userData;
    }

    set data(userData = []) {
        this._userData = userData;
    }

    render(user) {
        this._parentElement.innerHTML = '';
        const templateScript = `
        {{#if this._editCheck}}
        <div class="profile">
            <div class="userSection">
                <div class="userCart">
                    <div class="nickname">
                        <input type="text" name="nickname" value="{{nickname}}">
                    </div>
                    <div class="avatar">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" alt="avatar">
                    </div>
                    <div class="about">
                        {{About}}
                    </div>
                    <div class="mainInfo">
                        points: {{Points}} region: {{Region}}
                    </div>
                    <div class="buttonSection">
                        <p class="edit_btn">Изменить</p>
                        <button data-section="menu" class="btn">Назад</button>
                    </div>
                    <div class="social">
                        <a href="">vk</a>
                        <a href="">fb</a>
                        <a href="">inst</a>
                        <a href="">tw</a>
                        <a href="">pr</a>
                    </div>
                </div>
                <div class="fullInfo">
                    <div class="id">{{ID}}</div>
                    <div class="region">{{Region}}</div>
                    <div class="emailDiv">{{email}}</div>
                    <div class="age">{{Age}}</div>
                </div>
                <p type="submit" class="submit_btn">post</p>
            </div>
        </div>
        {{else}}
        <div class="profile">
            <div class="userSection">
                <div class="userCart">
                    <div class="nickname">
                        {{nickname}}
                    </div>
                    <div class="avatar">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" alt="avatar">
                    </div>
                    <div class="about">
                        {{About}}
                    </div>
                    <div class="mainInfo">
                        points: {{Points}} region: {{Region}}
                    </div>
                    <div class="buttonSection">
                        <button>Изменить</button>
                        <button data-section="menu" class="btn">Назад</button>
                    </div>
                    <div class="social">
                        <a href="">vk</a>
                        <a href="">fb</a>
                        <a href="">inst</a>
                        <a href="">tw</a>
                        <a href="">pr</a>
                    </div>
                </div>
                <div class="fullInfo">
                    <div class="id">{{ID}}</div>
                    <div class="region">{{Region}}</div>
                    <div class="emailDiv">{{email}}</div>
                    <div class="age">{{Age}}</div>
                </div>
                <p type="submit" class="submit_btn">post</p>
            </div>
        </div>
        {{/if}}
        `;
        let template = Handlebars.compile(templateScript);
        this._parentElement.innerHTML += template(user); 
        // if (this._editCheck) {
        //     let edit = this._parentElement.querySelector(".edit_btn");

        //     edit.addEventListener('click', () => {
        //         this._editCheck = true;
        //         render(user);
        //     })
        // } else {
        //     let edit = this._parentElement.querySelector(".edit_btn");

        //     edit.addEventListener('click', () => {
        //         this._editCheck = true;
        //         render(user);
        //     })
        // }
        let submint = this._parentElement.querySelector(".submit_btn");
        submint.addEventListener('click', () => {
            AjaxModule.doPost({
                callback(xhr) {
                    const answer = JSON.parse(xhr.responseText);
                    console.log('answer:', answer,'nickname:',user[nickname]);
                    render(answer);
                },
                path: '/users/' + user.nickname,
                body: {
                    nickname: 'gel0',
                },
            });
        })
    }



    createProfile(nickname) {
        const that = this;
        AjaxModule.doGet({
            callback(xhr) {
                const getAnswer = JSON.parse(xhr.responseText);
                if (typeof(getAnswer['Error']) === "undefined") {
                    that._parentElement.innerHTML = '';
                    that.render(getAnswer);
                } else {
                    alert(getAnswer['Error']);
                    console.log("WTF?");
                }
            },
            path: "/users/" + nickname,	
        });
    }
}
