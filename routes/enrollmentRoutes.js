// routes/enrollmentRoutes.js
const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, enrollmentController.enrollUser);
router.get('/', verifyToken, enrollmentController.getUserEnrollments);

module.exports = router;