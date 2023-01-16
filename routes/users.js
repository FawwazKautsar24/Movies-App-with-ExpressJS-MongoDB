var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { forwardAuth } = require('../config/auth');
// import userSchema
const User = require('../models/UserSchema');

/* GET login page. */
router.get('/login', forwardAuth, function(req, res, next) {
  res.render('login', {title: 'Login Page'});
});

/* POST login page. */
router.post('/login', forwardAuth, function(req, res, next) {
  const {email, password} = req.body;
  console.log(req.body);

  let errors = [];
  if(!email || !password){
    errors.push({msg: "Silahkan Lengkapi Data Anda"});
    console.log("Silahkan Lengkapi Data Anda");
  }
  if(errors.length > 0){
    res.render('login', {
      errors,
      email,
      password,
    });
  }else{
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true
                                   })(req, res, next);
  }  
});

/* GET register page. */
router.get('/register', forwardAuth, function(req, res, next) {
  res.render('register', {title: 'Register Page'});
});

/* POST register page. */
router.post('/register', forwardAuth, (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  console.log(req.body);

  let errors = [];
  if(!name || !email || !password || !password2){
    errors.push({msg: "Silahkan Lengkapi Data Anda"});
    console.log("Silahkan Lengkapi Data Anda");
  }
  if(password != password2){
    errors.push({msg: "Password Anda Tidak Sama!"});
    console.log("Password Anda Tidak Sama!");
  }
  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }else{
    User.findOne({ email: email }).then(
      user => {
        if(user){
          errors.push({msg: 'Email Anda telah Terdaftar'});
          console.log('Email Anda telah Terdaftar');
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        }else{
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          newUser.save().then(user => {
            console.log(user);
            console.log('Selamat Anda berhasil registrasi, silahkan login!');
            res.redirect('/auth/login');
          })
          .catch(err => console.log(err));
        }
      }
    )
  }
});

/* Logout App */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
