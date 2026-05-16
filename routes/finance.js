const express = require('express');
const router = express.Router();
const { users, financeRecords, accommodations } = require('../models/data');

function isFinance(req, res, next) {
  if (req.session.user && req.session.user.role === 'finance') {
    return next();
  }
  res.redirect('/');
}

router.get('/dashboard', isFinance, (req, res) => {
  res.render('finance-dashboard');
});

// Verify Payment & Change Status
router.get('/verify/:student_id', isFinance, (req, res) => {
  const student = users.find(u => u.student_id === req.params.student_id);
  
  if (student) {
    student.residency_type = "Residential";
    student.fee_status = "Paid";
    
    // Update accommodation
    const accom = accommodations.find(a => a.student_id === req.params.student_id);
    if (accom) accom.status = "Approved";
    
    res.send(`
      <h2>✅ Payment Verified Successfully!</h2>
      <p>Student <strong>${student.first_name} ${student.last_name}</strong> is now <strong>Residential</strong>.</p>
      <a href="/finance/dashboard">Back to Finance Dashboard</a>
    `);
  } else {
    res.send("Student not found");
  }
});

module.exports = router;