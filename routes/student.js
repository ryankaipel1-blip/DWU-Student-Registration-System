const express = require('express');
const router = express.Router();
const { users } = require('../models/data');

function isStudent(req, res, next) {
  if (req.session.user && req.session.user.role === 'student') return next();
  res.redirect('/');
}

router.get('/dashboard', isStudent, (req, res) => {
  res.render('student-dashboard', { user: req.session.user });
});

router.get('/request-change', isStudent, (req, res) => {
  res.render('request-change');
});

module.exports = router;