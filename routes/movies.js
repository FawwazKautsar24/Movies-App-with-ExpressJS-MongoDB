var express = require('express');
var router = express.Router();

// Get All Movies
router.get('/', function(req, res, next) {
    res.render('movie/allMovies', {title: 'Get Movies Page'});
});

// Create Movies
router.get('/create', function(req, res, next) {
    res.render('movie/createMovie', {title: 'Create Movie Page'});
});

// Update Movies
router.get('/update/:movieId', function(req, res, next) {
    res.render('movie/updateMovie', {title: 'Update Movie Page', movieId: req.params.movieId});
});

// Create Action
router.post('/create', function(req, res) {});

// Update Action
router.put('/update/:movieId', function(req, res) {});

// Delete Action
router.delete('/delete/:movieId', function(req, res) {});

module.exports = router;
