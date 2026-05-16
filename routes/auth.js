const express = require('express');
const router = express.Router();
const { users } = require('../models/data');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.user = user;
    
    if (user.role === 'student') {
      res.redirect('/student/dashboard');
    } else if (user.role === 'finance') {
      res.redirect('/finance/dashboard');
    } else if (user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else if (user.role === 'accommodation') {
      res.redirect('/accommodation/dashboard');
    }
  } else {
    res.send('<h2>Invalid credentials! <a href="/">Try Again</a></h2>');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;