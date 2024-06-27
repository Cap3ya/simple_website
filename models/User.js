// models/User.js
const connection = require('./db.js');

const User = {
    create: (userData, callback) => {
        const { name, email, password } = userData;
        connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
    },
    findByEmail: (email, callback) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], callback);
    }
};

module.exports = User;
