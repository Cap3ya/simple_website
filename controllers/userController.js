// controllers/userController.js
const User = require('../models/User');

const getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
};

const createUser = (req, res) => {
    const userData = req.body;
    User.create(userData, (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ message: 'User added', id: results.insertId });
    });
};

module.exports = {
    getAllUsers,
    createUser
};