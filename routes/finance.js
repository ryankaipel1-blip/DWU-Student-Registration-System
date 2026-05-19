const express = require('express');
const router = express.Router();
const { users, accommodations } = require('../models/data');

function isFinance(req, res, next) {
  if (req.session.user && req.session.user.role === 'finance') return next();
  res.redirect('/');
}

router.get('/dashboard', isFinance, (req, res) => {
  res.render('finance-dashboard');
});

router.post('/update-status', isFinance, (req, res) => {
  const { current_student_id, new_student_id, residency_type, balance } = req.body;

  const student = users.find(u => u.student_id === current_student_id);
  
  if (student) {
    // Update Student ID if provided
    if (new_student_id && new_student_id.trim() !== '') {
      student.student_id = new_student_id.trim();
    }

    // Update Residency and Balance
    student.residency_type = residency_type;
    student.balance = parseFloat(balance) || 0;
    student.fee_status = residency_type === "Residential" ? "Paid" : "Pending";

    // Update accommodation
    let accom = accommodations.find(a => a.student_id === current_student_id);
    if (!accom) {
      accom = { student_id: student.student_id, status: "Pending", request_type: "Change" };
      accommodations.push(accom);
    } else {
      accom.student_id = student.student_id;
    }
    accom.status = residency_type === "Residential" ? "Approved" : "Pending";

    res.render('success', { 
      message: "Student Information Updated Successfully!",
      studentName: student.first_name + " " + student.last_name,
      newStatus: residency_type,
      balance: student.balance
    });
  } else {
    res.send("<h2>Student not found with ID: " + current_student_id + "</h2><a href='/finance/dashboard'>Back</a>");
  }
});

module.exports = router;