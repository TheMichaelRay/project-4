var express = require('express');
var router = express.Router();
var passport = require('passport');
// var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) throw err;
      res.json(users)
    })
  })

router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    if (req.user) {
      res.json({message: req.user, created: true})
    } else {
      res.json({success: false, message: "Unable to create user"})
    }
  })

router.route('/login')
  .post(passport.authenticate('local-login'), function(req, res) {
    if (req.user) {
      res.json(req.user)
    } else {
      res.json({success: false, message: "Unable to verify user"})
    }
  })

router.use(isLoggedIn)

router.get('/profile', function(req, res) {
  if (req.user) {
    res.json({success: true, user: req.user})
  }
})

router.get('/logout', function (req, res) {
  req.logout()
  res.json({success: true, message: 'user logged out'})
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.json({success: false, message: "Not logged in"})
}

module.exports = router;
