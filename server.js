const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize, User } = require('./models/user'); // Make sure this file exists!

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.redirect('/login');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (user) {
    res.redirect('/dashboard.html');
  } else {
    res.send('Invalid credentials');
  }
});

// Serve login and signup HTML
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
});
