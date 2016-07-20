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

// router.post('/signup', function(req, res) {
//     res.json({success: true})
//   })
router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    if (req.user) {
      res.json(req.user)
    } else {
      res.json({success: false, message: "Unable to create user"})
    }
  })

router.post('/testing', function(req, res) {
  res.json({message: req.body})
})

// router.route('/login')
//   .post(passport.authenticate('local-login'), function(req, res) {
//     if (req.user) {
//       res.json(req.user)
//     } else {
//       res.json({success: false, message: "Unable to verify user"})
//     }
//   })

router.route('/login')
  .post(function(req, res) {
    res.json({success: true})
  })

router.use(isLoggedIn)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.json({success: false, message: "Not logged in"})
}

module.exports = router;
