require('dotenv');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'DEFAULT_SECRET'; // Use a more secure key and store it in environment variables

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('No token provided');
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded token:', decoded); // Log the decoded token
        req.userId = decoded.userId; // Assuming the payload contains the user id as 'id'
        console.log('Set userId:', req.userId); // Log the userId set in the request
    } catch (err) {
        console.log('Invalid token');
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

module.exports = verifyToken;