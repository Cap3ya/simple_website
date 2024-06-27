class LoginForm extends HTMLElement {
    constructor() {
        super();
        const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };
        
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                if (!response.ok) {
                    throw new Error('Login failed');
                }
        
                const result = await response.json();
                localStorage.setItem('token', result.token);
                alert('Login successful');
                window.location.href = '/'; // Redirect to homepage or dashboard
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please check your credentials and try again.');
            }
        });        
    }
}

customElements.define('login-form', LoginForm);