
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/create', (req, res) => {
    const { title, content, visibility } = req.body;
    const user_id = req.session.userId;
    if (!user_id) return res.status(401).send('Not logged in');
    db.run('INSERT INTO blogs (user_id, title, content, visibility) VALUES (?, ?, ?, ?)',
      [user_id, title, content, visibility], (err) => {
        if (err) return res.status(500).send('Error creating blog');
        res.redirect('/dashboard.html');
      });
  });

  router.get('/all', (req, res) => {
    db.all('SELECT * FROM blogs', [], (err, rows) => {
      if (err) return res.status(500).send('Error loading blogs');
      res.json(rows);
    });
  });

  router.post('/delete', (req, res) => {
    const id = req.body.id;
    db.run('DELETE FROM blogs WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).send('Delete failed');
      res.redirect('/dashboard.html');
    });
  });

  return router;
};
