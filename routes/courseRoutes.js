// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', courseController.getAllCourses);
router.post('/', authMiddleware, courseController.enrollUser);

module.exports = router;