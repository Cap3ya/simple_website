// models/Enrollment.js
const db = require('./db.js');

const Enrollment = {
    create: (enrollmentData, callback) => {
        console.log(enrollmentData)
        const query = 'INSERT INTO enrollments SET ?';
        db.query(query, enrollmentData, callback);
    },
    countByCourseId: (courseId, callback) => {
        const query = 'SELECT COUNT(*) AS count FROM enrollments WHERE course_id = ?';
        db.query(query, [courseId], callback);
    },
    findByUserId: (userId, callback) => {
        const query = 'SELECT * FROM enrollments WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Enrollment;