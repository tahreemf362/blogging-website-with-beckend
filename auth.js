
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

module.exports = (db) => {
  router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 8);
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashed],
      (err) => {
        if (err) return res.status(400).send('User exists');
        res.redirect('/dashboard.html');
      });
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err || !user) return res.status(400).send('Invalid login');
      if (!bcrypt.compareSync(password, user.password)) return res.status(403).send('Wrong password');
      req.session.userId = user.id;
      res.redirect('/dashboard.html');
    });
  });

  return router;
};
