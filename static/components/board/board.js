export class boardComponent {
    constructor ({
        parentElement = document.body, 
    } = {}) {
        this._parentElement = parentElement;
    }

    get data() {
        return this._usersArr;
    }

    set data(usersArr = []) {
        this._usersArr = usersArr;
    }

    renderOld() {
        const table = document.createElement('table');
		table.className = 'leadersTable'
		const thead = document.createElement('thead');
		thead.innerHTML = `
		<tr>
			<th>Email</th>
			<th>Age</th>
			<th>Score</th>
		</th>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		this._usersArr.forEach( function({
                email = '',
                age = 18,
                score = 0,
            } = {}) {
			console.log(email, age, score);

			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
            const tdScore = document.createElement('td');
            tr.className = "tr";

			tdEmail.textContent = email;
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

            tbody.appendChild(tr);
            this._parentElement.appendChild(table);
		}.bind(this));
    }

    render(users) {
        console.log(users); 
        var templateScript = `
            <table class="leadersTable" border="1" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each users }}
                    <tr class="tr">
                        <td>{{email}}</td>
                        <td>{{age}}</td>
                        <td>{{score}}</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        `;
        console.log(templateScript);
        const template = Handlebars.compile(templateScript);
        console.log(template(users));
        this._parentElement.innerHTML += template(users); 
    }
}