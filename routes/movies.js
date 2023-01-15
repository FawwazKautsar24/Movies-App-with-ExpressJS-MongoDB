var express = require('express');
var router = express.Router();

var moment = require('moment');
var Movie = require('../models/MovieSchema');

// Get All Movies
router.get('/', function(req, res, next) {
    let listMovies = [];
    Movie.find(function(err, movies){
        if(movies){
            for(let data of movies){
                listMovies.push({
                    id: data._id,
                    name: data.name,
                    released_on: data.released_on,
                });
            }
            res.render('movie/allMovies', {listMovies});
        }else{
            listMovies.push({
                id: '',
                name: '',
                released_on: '',
            });
            res.render('movie/allMovies', {listMovies});
        }
    });
    // res.render('movie/allMovies', {title: 'Get Movies Page'});
});

// Create Movies
router.get('/create', function(req, res, next) {
    res.render('movie/createMovie', {title: 'Create Movie Page'});
});

// Update Movies
router.get('/update/:movieId', function(req, res, next) {

    Movie.findById(req.params.movieId, function(err, movieInfo){
        var newDate = moment(movieInfo.released_on).format('YYYY-MM-DD');
        
        if(movieInfo){
            res.render('movie/updateMovie', {
                movies: movieInfo,
                newDate
            });
        }
    });
    // res.render('movie/updateMovie', {title: 'Update Movie Page', movieId: req.params.movieId});
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
router.post('/update', function(req, res) {
    let errors = [];

    Movie.findByIdAndUpdate(req.body.id, {name: req.body.name, released_on: req.body.date}, function(err){
        if(err){
            console.log(err);
        }else{
            var newMovie = {_id: req.body.id, name: req.body.name};
            var newDate = moment(req.body.date).format('YYYY-MM-DD');
            
            errors.push({msg: 'Data Berhasil Di-update!'});
            res.render('movie/updateMovie', {
                movies: newMovie,
                newDate,
                errors
            });
        }
    });
});

// Delete Action
router.get('/delete/:movieId', function(req, res) {
   Movie.findByIdAndDelete(req.params.movieId, function(){
    res.redirect('/movies');
   }); 
});

module.exports = router;
