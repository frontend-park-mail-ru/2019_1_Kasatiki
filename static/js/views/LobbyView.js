import BaseView from './View.js';

const { NetworkHandler } = window;

/**
 * Класс с отрисовкой формы логина.
 */
export default class LobbyView extends BaseView {
    constructor() {
        super(...arguments);
        this.LoginComponent = new LobbyComponent();
        this.initSpecialRoutes();

        this.lobbyWs;
        this.ready;
    }

    show() {
        let that = this;
        NetworkHandler.doGet({
            callback(data) {
                that._openLobbyWs()
                that.root.innerHTML = that.LobbyComponent.render(data);
                that._lobbyLogic();
            },
            path: '/api/lobby',
        });
    }

    _openLobbyWs() {
        this.ws = new WebSocket('https://advhater.ru/ws/lobby');

        this.ws.onopen = () => {
            console.log('ws success connect');
            
            const chatbox = document.querySelector('.chat__chatbox');
            let that = this;

            that.ws.onmessage = (evt) => {
                // const messageBox = document.createElement("div");
                // messageBox.className = 'chat__chatbox-message'
                // messageBox.innerText = evt.data + '\n';

                // console.log(evt, evt.data);

                // chatbox.appendChild(messageBox);   
            }
        }
    }

    _valideteBetInput(bet) {
        return rightBet = bet.replace(/[^\d;]/g, '');
    }

    _lobbyLogic() {
        let that = this;

        const bet1 = document.querySelector('.lobby_communication-section_player-1-bet-value');
        const bet2 = document.querySelector('.lobby_communication-section_player-2-bet-value');
        const totalBet = document.querySelector('.lobby_controll-section-bet-value');

        const betBtn = document.querySelector('.lobby_controll-section-inputs-placeBtn');
        const readyBtn = document.querySelector('.lobby_controll-section-ready-section-btn');
        const betInput = document.querySelector('.lobby_controll-section-inputs-value');

        let playerBetSection = document.querySelector('.lobby_communication-section_player-bet');

        betBtn.addEventListener('click', () => {
            let bet = _valideteBetInput(betInput.value);

            that.ws.send(bet);
        })

        readyBtn.addEventListener('click', () => {
            that.ready = true;

            playerBetSection.style.backgroundColor = 'red';
            playerBetSection.style.color = 'white';

            that.ws.send(that.ready);
        })
    }    
}