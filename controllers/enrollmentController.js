const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const enrollUser = (req, res) => {
    const userId = req.userId; // Obtain userId from the token
    const { courseId } = req.body; // Ensure courseId is obtained from the request body

    console.log('Enroll request received for userId:', userId, 'and courseId:', courseId); // Log the enrollment request

    if (!courseId) {
        return res.status(400).json({ message: 'courseId is required' });
    }

    Enrollment.countByCourseId(courseId, (err, results) => {
        if (err) {
            console.error('Error counting enrollments:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }
        if (results[0].count >= 30) {
            res.status(400).json({ message: 'Course is full' });
            return;
        }

        const enrollmentData = { user_id: userId, course_id: courseId };
        Enrollment.create(enrollmentData, (err, results) => {
            if (err) {
                console.error('Error enrolling user:', err);
                res.status(500).json({ message: 'Server error' });
                return;
            }
            res.json({ message: 'User enrolled successfully', id: results.insertId });
        });
    });
};

const getUserEnrollments = (req, res) => {
    const userId = req.userId;

    Enrollment.findByUserId(userId, (err, enrollments) => {
        if (err) {
            console.error('Error fetching enrollments:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        const courseIds = enrollments.map(enrollment => enrollment.course_id);

        if (courseIds.length === 0) {
            res.json([]);
            return;
        }

        Course.findByIds(courseIds, (err, courses) => {
            if (err) {
                console.error('Error fetching courses:', err);
                res.status(500).json({ message: 'Server error' });
                return;
            }
            res.json(courses);
        });
    });
};

module.exports = {
    enrollUser,
    getUserEnrollments
};
