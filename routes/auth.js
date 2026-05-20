const express = require('express');
const router = express.Router();
const { users } = require('../models/data');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.user = user;
    console.log(`Login successful: ${user.username} (${user.role})`);

    if (user.role === 'student') res.redirect('/student/dashboard');
    else if (user.role === 'finance') res.redirect('/finance/dashboard');
    else if (user.role === 'admin') res.redirect('/admin/dashboard');
    else if (user.role === 'accommodation') res.redirect('/accommodation/dashboard');
    else res.redirect('/');
  } else {
    res.send('<h2 style="color:red;text-align:center;margin-top:50px;">Invalid credentials!<br><a href="/">← Try Again</a></h2>');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;