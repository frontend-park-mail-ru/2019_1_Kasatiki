const {AjaxModule} = window;

export class profileComponent {
    constructor({
        parentElement = document.body,
    } = {}) {
        this._parentElement = parentElement;
        this._editCheck = false;
    }

    get data() {
        return this._parentElement;
    }

    set data(obj) {
        this._parentElement = obj;
    }

    render(user) {
        const that = this;
        this._parentElement.innerHTML = '';
        const templateScript = `
        {{#if editCheck}}
        <div class="profile">
            <div class="userSection">
                <div class="userCart">
                    <div class="nickname">
                        <input class="inputs" type="text" name="nickname" value="{{nickname}}">
                    </div>
                    <div class="avatar">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png" alt="avatar">
                    </div>
                    <div class="about">
                        <input class="inputs" type="text" name="About" value="{{About}}">
                    </div>
                    <div class="mainInfo">
                        {{Points}}
                    </div>
                    <div class="buttonSection">
                        <button class="sub_btn">Сохранить</button>
                        <button class="back_btn">Отмена</button>
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
                    <div class="id">id: {{ID}}</div>
                    <div class="region"><input class="inputs" type="text" name="Region" value="{{Region}}"></div>
                    <div class="emailDiv"><input class="inputs" type="text" name="email" value="{{email}}"></div>
                    <div class="age"><input type="text" class="inputs" name="Age" value="{{Age}}"></div>
                </div>
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
                        points: {{Points}}
                    </div>
                    <div class="buttonSection">
                        <button class="edit_btn">Изменить</button>
                        <button data-section="menu" class="back_btn">Назад</button>
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
                    <div class="id">id: {{ID}}</div>
                    <div class="region">region: {{Region}}</div>
                    <div class="emailDiv">email: {{email}}</div>
                    <div class="age">age: {{Age}}</div>
                </div>
            </div>
        </div>
        {{/if}}
        `;
        let template = Handlebars.compile(templateScript);
        this._parentElement.innerHTML += template(user); 
        console.log('parent:',this._parentElement);
        if (user.editCheck) {
            let submit = this._parentElement.querySelector(".sub_btn");
            let back = this._parentElement.querySelector(".back_btn");

            submit.addEventListener('click', () => {
                user.editCheck = false;

                const inputs = that._parentElement.querySelectorAll('.inputs');
                console.log(inputs);

                let req = {};

                inputs.forEach(element => {
                    // console.log(element.value, user[element.name]);
                    if (element.value != user[element.name]) {
                        if (element.name === 'Age') {
                            console.log(typeof(element.value));
                            const age = parseInt(element.value);
                            console.log(typeof(element.value));
                            req[element.name] = age;
                        } else {
                            req[element.name] = element.value;
                            console.log(typeof(element.value));
                        }
                    }
                });

                if (Object.keys(req).length == 0) {
                    req.error = 'empty'
                }
                
                AjaxModule.doPost({
                    callback(xhr) {
                        const answer = JSON.parse(xhr.responseText);
                        //console.log('answer:', answer,'nickname:',user[nickname]);
                        that.render(answer);
                    },
                    path: '/users/' + user.nickname,
                    body: req,
                });
            });

            back.addEventListener('click', () => {
                user.editCheck = false;
                console.log(user.editCheck);   
                that.render(user);
            })
        } else {
            let edit = this._parentElement.querySelector(".edit_btn");

            edit.addEventListener('click', () => {
                user.editCheck = true;
                console.log('in false: ',that._editCheck);   
                that.render(user);
            })
        }
        const avatar = this._parentElement.querySelector(".avatar");
        avatar.addEventListener('click', () => {
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
