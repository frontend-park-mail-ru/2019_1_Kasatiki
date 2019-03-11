const {AjaxModule} = window;

export class profileComponent {
    
    constructor({
        parentElement = document.body,
    } = {}) {
        this._parentElement = parentElement;
        // bool, определяющий текущий режим профиля (просмотр/изменение)
        this._editCheck = false;
    }

    // Геттеры - Сеттеры
    get data() {
        return this._parentElement;
    }

    set data(obj) {
        this._parentElement = obj;
    }

    render(authStatus, user) {
        // На живца
        const that = this;

        console.log('in profile',authStatus)

        this._parentElement.innerHTML = '';
        if (authStatus) {
            // Используем методы шаблонизатора для динамической отрисовки страницы 
            var templateScript = `
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
                            <form enctype="multipart/form-data" method="post" class="mainForm" action="upload" onsubmit="console.log(this.value)">
                                <input name="uploadfile" type="file" accept="image/*" class="avatar_change">
                                <input type="submit" value="send!" class="sub_photo">
                            </form>
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

            if (user.editCheck) {
                const submit = this._parentElement.querySelector(".sub_btn");
                const submitPhoto = this._parentElement.querySelector(".sub_photo");
                const back = this._parentElement.querySelector(".back_btn");

                // Для отправки аватара 
                const imgFile = that._parentElement.querySelector(".avatar_change");
                const mainForm = that._parentElement.querySelector(".mainForm");
                
                // Обработчик сабмита фотографии (только ее)
                // Изначально планировалась отправка с помощью html <form>, так как эта форма имеет 
                // enctype="multipart/form-data"
                mainForm.addEventListener('submit', function(event) {
                    // Не смогли справиться с переадресацией (атрибут action="/upload")
                    // Переправляет на lh:8080/upload - от этого не избавится
                    event.preventDefault();

                    console.log(mainForm);
                    console.log(imgFile);

                    var imageForm = new FormData();
                    var uploadFile = imgFile.value;
                    imageForm.append('avatar', uploadFile);

                    AjaxModule.doPost({
                        callback(xhr) {
                            const answer = JSON.parse(xhr.responseText);
                            console.log('answer:', answer);
                        },
                        path: '/upload',
                        body: imageForm,
                    });
                });

                // Обработчик самбмита измененных данных профиля
                submit.addEventListener('click', () => {
                    user.editCheck = false;
    
                    const inputs = that._parentElement.querySelectorAll('.inputs');
                    // console.log(inputs);
    
                    let req = {};

                    // Для аватара
                    let imageForm = new FormData();
                    let uploadFile = imgFile.files[0];
                    imageForm.append('avatar', uploadFile);

                    // Кидаем в реквест аватар тоже 
                    req.avatar = imageForm;
    
                    // Преобразуем типы (стринга -> инт), так как html input type="text"
                    inputs.forEach(element => {
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
    
                    // Отправляем только те данные, которые поменял пользователь
                    if (Object.keys(req).length == 0) {
                        req.error = 'empty'
                    }
                    
                    // Делаем на user/nickname, а не на /upload
                    AjaxModule.doPost({
                        callback(xhr) {
                            const answer = JSON.parse(xhr.responseText);
                            // console.log('answer:', answer,'nickname:',user[nickname]);
                            that.render(authStatus, answer);
                        },
                        path: '/users/' + user.nickname,
                        body: req,
                    });
                });
                
                // Обработчик для кнопки возврата в режим просмотра профиля (измененные
                // данные не сохраняются)
                back.addEventListener('click', () => {
                    user.editCheck = false;
                    console.log(user.editCheck);   
                    that.render(authStatus, user);
                })
            // Режим просмотра
            } else {
                let edit = this._parentElement.querySelector(".edit_btn");
    
                // Обработчик перехода в режим редактирвания
                edit.addEventListener('click', () => {
                    user.editCheck = true;
                    console.log('in false: ',that._editCheck);   
                    that.render(authStatus, user);
                })
            }
        } else {
            var templateScript = `
                <div class="menu">
                    <h1>Вы не авторизированы</h1>
                    <button data-section="login" class="btn">Войти</button>
                    <button data-section="signup" class="btn">Зарегистрироваться</button>
                    <button data-section="menu" class="btn">Назад</button>
                </div>
            `;
            let template = Handlebars.compile(templateScript);
            this._parentElement.innerHTML += template(user); 
        }
    
       
    }

    // Главная функция, если пользователь залогинен, его отсылает на /me: 
    // Делается get запрос -> сравнивается кука -> возвращается фулл инфо 
    // о пользователе
    createProfile(authStatus) {
        // Тут уже на мотыля 
        const that = this;
        AjaxModule.doGet({
            callback(xhr) {
                const getAnswer = JSON.parse(xhr.responseText);
                if (typeof(getAnswer['Error']) === "undefined") {
                    // И подсекаем, подсекаем !
                    that._parentElement.innerHTML = '';
                    that.render(authStatus ,getAnswer);
                } else {
                    alert(getAnswer['Error']);
                    console.log("WTF?");
                }
            },
            path: "/me",	
        });
    }
}
