const db = require('../config/database.js');

const getAllArticles = (req, res) => {
    db.query('SELECT * FROM articles', (err, results) => {
        if (err) {
            console.error('Error fetching articles:', err);
            res.status(500).send('Server error');
        } else {
            res.json(results);
        }
    });
};

const purchaseArticle = (req, res) => {
    const { userId, articleId } = req.body;
    const query = 'INSERT INTO purchases (user_id, article_id) VALUES (?, ?)';

    db.query(query, [userId, articleId], (err, results) => {
        if (err) {
            console.error('Error purchasing article:', err);
            res.status(500).send('Server error');
        } else {
            res.json({ message: 'Purchase successful', id: results.insertId });
        }
    });
};

module.exports = {
    getAllArticles,
    purchaseArticle
};