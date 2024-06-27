class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const isLoggedIn = localStorage.getItem('token') !== null; // Check if user is logged in

        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #333;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }

                nav {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                nav a {
                    color: #fff;
                    text-decoration: none;
                    padding: 5px 10px;
                }

                nav a:hover {
                    background-color: #555;
                }
            </style>
            <header>
                <h1>Simple Website</h1>
                <nav>
                    <a href="index.html">Home</a>
                    <a href="courses.html">Courses</a>
                    ${isLoggedIn ? '<a href="enrolledCourses.html">My Courses</a>' : ''}
                    ${!isLoggedIn ? '<a href="register.html">Register</a>' : ''}
                    ${!isLoggedIn ? '<a href="login.html">Login</a>' : ''}
                    ${isLoggedIn ? '<a href="#" id="logout">Logout</a>' : ''}
                </nav>
            </header>
        `;
    }

    addEventListeners() {
        const logoutLink = this.shadowRoot.getElementById('logout');
        logoutLink.addEventListener('click', () => this.logout());
    }

    logout() {
        localStorage.removeItem('token'); // Remove token from localStorage
        window.location.href = '/'; // Redirect to login page
        alert('Logged out successfully');
    }
}

customElements.define('header-component', HeaderComponent);