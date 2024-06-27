// controllers/courseController.js
const Course = require('../models/Course');

const getAllCourses = (req, res) => {
    Course.getAll((err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
};

module.exports = {
    getAllCourses
};