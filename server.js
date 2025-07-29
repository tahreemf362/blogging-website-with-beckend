
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'myblogsecret',
  resave: false,
  saveUninitialized: true
}));

// SQLite setup
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'), (err) => {
  if (err) console.error(err.message);
  else console.log('✅ Connected to SQLite database.');
});

// Create tables
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT UNIQUE,
  password TEXT,
  private INTEGER DEFAULT 0
);`);

db.run(`CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT,
  content TEXT,
  image TEXT,
  privacy TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);`);

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'blog.html'));
});

// Serve dashboard (static file)
app.get('/dashboard.html', (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please login first."); window.location.href = "/";</script>`);
  }
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

// API: Get session user
app.get('/auth/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({});
  }
});

// API: Logout
app.get('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// API: Update private status
app.post('/auth/update-private', (req, res) => {
  if (!req.session.user) return res.status(401).json({ success: false });

  const isPrivate = req.body.private ? 1 : 0;
  db.run("UPDATE users SET private = ? WHERE id = ?", [isPrivate, req.session.user.id], function (err) {
    if (err) return res.status(500).json({ success: false });

    req.session.user.private = !!isPrivate;
    res.json({ success: true });
  });
});

// ✅ Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [email, email, hashed], function (err) {
    if (err) {
      console.error(err.message);
      return res.send(`<script>alert("User already exists."); window.location.href = "/";</script>`);
    }
    req.session.user = { id: this.lastID, username: email, email: email, private: false };
    res.send(`<script>window.location.href='/dashboard.html';</script>`);
  });
});

// ✅ Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) {
      return res.send(`<script>alert("User not found."); window.location.href = "/";</script>`);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.send(`<script>alert("Incorrect password."); window.location.href = "/";</script>`);
    }
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      private: !!user.private
    };
    res.send(`<script>window.location.href='/dashboard.html';</script>`);
  });
});

// ✅ Admin Panel - List users
app.get('/admin/users', (req, res) => {
  db.all("SELECT id, username, email FROM users", [], (err, rows) => {
    if (err) return res.status(500).send("Error fetching users");
    let html = '<h2>Registered Users</h2><ul>';
    rows.forEach(user => {
      html += `<li>ID: ${user.id} | ${user.username} | ${user.email}
        <form action="/admin/deleteUser" method="POST" style="display:inline;">
          <input type="hidden" name="id" value="${user.id}" />
          <button type="submit">Delete</button>
        </form></li>`;
    });
    html += '</ul>';
    res.send(html);
  });
});

// ✅ Admin Panel - Delete user
app.post('/admin/deleteUser', (req, res) => {
  const { id } = req.body;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).send("Error deleting user");
    res.redirect('/admin/users');
  });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
