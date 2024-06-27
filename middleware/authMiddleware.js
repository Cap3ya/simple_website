require('dotenv');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'DEFAULT_SECRET'; // Use a more secure key and store it in environment variables

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = authMiddleware;