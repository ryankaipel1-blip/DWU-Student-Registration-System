const express = require('express');
const router = express.Router();

function isAccommodation(req, res, next) {
  if (req.session.user && req.session.user.role === 'accommodation') {
    return next();
  }
  res.redirect('/');
}

router.get('/dashboard', isAccommodation, (req, res) => {
  res.render('accommodation-dashboard', { user: req.session.user });
});

module.exports = router;