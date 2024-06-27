// models/Course.js
const db = require('./db.js');

const Course = {
    create: (courseData, callback) => {
        const query = 'INSERT INTO courses SET ?';
        db.query(query, courseData, callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM courses';
        db.query(query, callback);
    },
    findById: (courseId, callback) => {
        const query = 'SELECT * FROM courses WHERE id = ?';
        db.query(query, [courseId], callback);
    },
    findByIds: (courseIds, callback) => {
        const query = 'SELECT * FROM courses WHERE id IN (?)';
        db.query(query, [courseIds], callback);
    }
};

module.exports = Course;