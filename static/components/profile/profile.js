export class profileComponent {
    constructor({
        parentElement = document.body,
    } = {}) {
        this._parentElement = parentElement;
    }

    get data() {
        return this._userData;
    }

    set data(userData = []) {
        this._userData = userData;
    }

    render(user) {
        const templateScript = `
        <div class="profile">
            
            <button data-section="menu" class="btn">Back</button>
            <button data-section="edit" class="edit btn">Изменить</button>
        </div>
        `
    }
}