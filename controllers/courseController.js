const Course = require('../models/Course');

const getAllCourses = (req, res) => {
    Course.getAll((err, courses) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).send('Server error');
        }
        res.json(courses);
    });
};

const enrollUser = (req, res) => {
    const { courseId } = req.body;
    const userId = req.userId; // This should be set by your authMiddleware

    Course.enroll(userId, courseId, (err) => {
        if (err) {
            console.error('Error enrolling user:', err);
            return res.status(500).send('Server error');
        }
        res.send('User enrolled successfully');
    });
};

module.exports = {
    getAllCourses,
    enrollUser
};