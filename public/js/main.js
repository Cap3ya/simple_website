// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const courseList = document.getElementById('course-list');

    if (loginForm) {
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

    if (courseList) {
        fetchCourses();
    }

    async function fetchCourses() {
        try {
            const response = await fetch('/api/courses');
            const courses = await response.json();
            courseList.innerHTML = courses.map(course => `
                <li>
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <p>${new Date(course.date).toLocaleDateString()}</p>
                    <button onclick="enroll(${course.id})">Enroll</button>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
});