// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
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

    

    const navLinks = document.querySelectorAll(".navLinks");
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {

            event.preventDefault();
            
            const href = event.target.getAttribute('href');
            fetch(href).then(function (response) {
                return response.text();
            }).then(function (html) {
                // Convert the HTML string into a document object
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Get the image file
                document.querySelector('main').replaceWith(doc.querySelector('main'));

            }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
            });
        });
    });
});