// public/components/EnrolledCoursesLists.js

class EnrolledCoursesList extends HTMLElement {
    constructor() {
        super();
        const enrolledCoursesList = document.getElementById('enrolled-courses-list');

        if (enrolledCoursesList) {
            fetchEnrolledCourses();
        }

        async function fetchEnrolledCourses() {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to view your enrolled courses.');
                return;
            }

            try {
                const response = await fetch('/api/enrollments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled courses');
                }

                const courses = await response.json();
                console.log(courses)
                enrolledCoursesList.innerHTML = courses.map(course => `
                <li>
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <p>${new Date(course.date).toLocaleDateString()}</p>
                </li>
            `).join('');
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
                alert('Failed to fetch enrolled courses. Please try again later.');
            }
        }
    }
}

customElements.define('my-courses', EnrolledCoursesList);