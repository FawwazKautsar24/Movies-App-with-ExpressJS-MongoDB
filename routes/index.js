var express = require('express');
var router = express.Router();

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Welcome Page' });
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard Page' });
});

module.exports = router;
