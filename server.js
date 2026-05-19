const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'dwu2026secretkey',
  resave: false,
  saveUninitialized: false
}));

// Fake Data Store
const { users, financeRecords, accommodations } = require('./models/data');

// Routes
// Routes
app.use('/', require('./routes/auth'));
app.use('/student', require('./routes/student'));
app.use('/finance', require('./routes/finance'));
app.use('/accommodation', require('./routes/accommodation'));
app.use('/admin', require('./routes/admin'));   // ← Add this line

// Home Route
app.get('/', (req, res) => res.render('login'));

app.listen(PORT, () => {
  console.log(`✅ DWU System Running at http://localhost:${PORT}`);
});