var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

// import userSchema
const User = require('../models/UserSchema');

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login Page'});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
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
    User.findOne({ email: email }).then(
      async (user) => {
        if(user){
          if(await bcrypt.compare(password, user.password)){
            console.log(user);
            console.log(`cek ${password} || ${user.password}`);
            res.redirect('/dashboard');
          }else{
            errors.push({msg: 'Password Anda Salah!'});
            console.log('Password Anda Salah!');
            res.render('login', {errors});
          }
        }else{
          errors.push({msg: 'Email Anda Salah!'});
          console.log('Email Anda Salah!');
          res.render('login', {errors});
        }
      }
    )
    .catch((err) => {
      errors.push({msg: 'Internal Server Error!'});
      console.log(`Internal Server Error! ${err.message}`);
      res.render('login', {errors});
    });
  }  
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register Page'});
});

/* POST register page. */
router.post('/register', (req, res, next) => {
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
  res.redirect('/');
});

module.exports = router;
