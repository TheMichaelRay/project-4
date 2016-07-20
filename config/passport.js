var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  User = require('../models/User.js')


passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'local.email',
  passwordField: 'local.password',
  passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return done(err)
      if (user) return done(null, false, {message: "user could not be created"})
      var newUser = new User()
      newUser.firstName = req.body.firstName
      newUser.lastName = req.body.lastName
      newUser.age = req.body.age
      if (req.body.bio) newUser.bio = req.body.bio
      if (req.body.avatar) newUser.avatar = req.body.avatar
      newUser.local.email = email
      // export MD5 package into passport file to MD5(email) and concat string to have image url set in avatar value
      // newUser.local.avatar = "http://gravatar.com/avatar/" + MD5(email) + "?s=600"
      newUser.local.password = newUser.generateHash(password)

      newUser.save(function (err) {
        if (err) return console.log(err);
        return done(null, newUser, null)
      })
    })
  }))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return done(err)
      if(!user) return done(null, false, {message: "incorrect user"})
      if (!user.validPassword(password)) return done(null, false, {message: "incorrect password"})
      return done(null, user)
    })
  }))
