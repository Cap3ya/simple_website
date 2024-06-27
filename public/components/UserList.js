// public/components/UserList.js
class UserList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    background: #f4f4f4;
                    margin: 5px 0;
                    padding: 10px;
                    border: 1px solid #ddd;
                }
            </style>
            <ul id="user-list"></ul>
        `;
        this.fetchUsers();
    }

    async fetchUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            const userList = this.shadowRoot.getElementById('user-list');
            userList.innerHTML = users.map(user => `<li>${user.name} - ${user.email}</li>`).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}

customElements.define('user-list', UserList);