const express = require('express');
const router = express.Router();
const { users, accommodations } = require('../models/data');

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.redirect('/');
}

router.get('/dashboard', isAdmin, (req, res) => res.render('admin-dashboard'));

router.get('/add-student', isAdmin, (req, res) => res.render('add-student'));

router.post('/add-student', isAdmin, (req, res) => {
  const { student_id, first_name, last_name, residency_type, username, password } = req.body;

  const newStudent = {
    id: Date.now(),
    username: username || first_name.toLowerCase(),
    password: password || "123",
    role: "student",
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    residency_type,
    fee_status: residency_type === "Residential" ? "Paid" : "Pending",
    student_id: student_id.trim(),
    balance: 0
  };

  users.push(newStudent);
  accommodations.push({ student_id: student_id.trim(), status: "Pending", request_type: "New" });

  res.render('success', { 
    message: "New Student Added Successfully!",
    studentName: first_name + " " + last_name 
  });
});

router.get('/view-students', isAdmin, (req, res) => {
  const students = users.filter(u => u.role === 'student');
  res.render('view-students', { students });
});

router.get('/reports', isAdmin, (req, res) => {
  const students = users.filter(u => u.role === 'student');
  const residential = students.filter(s => s.residency_type === 'Residential').length;
  const nonResidential = students.length - residential;
  const totalDue = students.reduce((sum, s) => sum + (s.balance || 0), 0);

  res.render('reports', { totalStudents: students.length, residential, nonResidential, totalDue });
});

router.get('/manage-users', isAdmin, (req, res) => {
  res.render('manage-users', { users });
});

module.exports = router;