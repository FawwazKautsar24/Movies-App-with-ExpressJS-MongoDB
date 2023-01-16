var express = require('express');
var router = express.Router();

const { cekAuth, forwardAuth } = require('../config/auth');

/* GET welcome page. */
router.get('/', forwardAuth, function(req, res, next) {
  res.render('welcome', { title: 'Welcome Page' });
});

/* GET dashboard page. */
router.get('/dashboard', cekAuth, function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard Page' });
});

module.exports = router;
