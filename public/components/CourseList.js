class CourseList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.enroll = this.enroll.bind(this); // Bind the enroll function
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
                button {
                    padding: 5px 10px;
                    margin-top: 5px;
                }
            </style>
            <ul id="course-list"></ul>
        `;
        this.fetchCourses();
    }

    async fetchCourses() {
        try {
            const response = await fetch('/api/courses');
            const courses = await response.json();
            const courseList = this.shadowRoot.getElementById('course-list');
            courseList.innerHTML = courses.map(course => `
                <li>
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <p>${new Date(course.date).toLocaleDateString()}</p>
                    <button data-id="${course.id}">Enroll</button>
                </li>
            `).join('');
            this.addEventListeners();
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    addEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('button[data-id]');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const courseId = button.getAttribute('data-id');
                this.enroll(courseId);
            });
        });
    }

    async enroll(courseId) {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please login to enroll in a course.');
            return;
        }

        try {
            const response = await fetch('/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courseId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Enrollment failed');
            }

            alert('Enrollment successful');
        } catch (error) {
            console.error('Error enrolling:', error);
            alert(`Enrollment failed: ${error.message}`);
        }
    }
}

customElements.define('course-list', CourseList);