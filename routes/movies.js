var express = require('express');
var router = express.Router();

var Movie = require('../models/MovieSchema');

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
router.post('/create', function(req, res) {
    const {name, date} = req.body;
    
    let errors = [];
    if(!name || !date){
        errors.push({msg: 'Silahkan Lengkapi Data yang Dibutuhkan'});
    }

    if(errors.length > 0){
        res.render('movie/createMovie', {errors});
    }else{
        const newMovie = Movie({
            name,
            released_on: date
        });
        newMovie.save().then(
            movie => {
                errors.push({msg: 'Data Movies Berhasil Ditambah'});
                res.render('movie/createMovie', {errors})
            }
        )
        .catch(err => console.log(err));
    }
});

// Update Action
router.put('/update/:movieId', function(req, res) {});

// Delete Action
router.delete('/delete/:movieId', function(req, res) {});

module.exports = router;
