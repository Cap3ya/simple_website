// server.js
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');

const express = require('express');
const cors = require('cors');
require('dotenv');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/enrollments', enrollmentRoutes); // Routes for enrollments
app.use('/api/courses', courseRoutes); // Routes for courses
app.use('/api/auth', authRoutes); // Routes for authentication (register, login)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});