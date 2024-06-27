// server.js
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

const express = require('express');
const path = require('path');
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
app.use('/api/articles', articleRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Define routes to serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/courses.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/articles.html'));
});

app.get('/enrolledCourses', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/enrolledCourses.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/register.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});