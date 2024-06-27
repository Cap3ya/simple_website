class HeaderComponent extends HTMLElement {
    constructor() {
        super();

        if (localStorage.getItem('token')) {
            login.hidden = true;
            logout.addEventListener('click', this.logout.bind(this))
        } else {
            enrolledCourses.hidden = true;
            logout.hidden = true;
        }
    }

    logout() {
        localStorage.removeItem('token'); // Remove token from localStorage
        window.location.href = '/'; // Redirect to login page
        alert('Logged out successfully');
    }
}

customElements.define('header-component', HeaderComponent);