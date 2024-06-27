class RegisterForm extends HTMLElement {
    constructor() {
        super();
        const registerForm = document.getElementById('register-form');

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                alert('Registration successful. You can now login.');
                registerForm.reset();
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again later.');
            }
        });

    }
}

customElements.define('register-form', RegisterForm);