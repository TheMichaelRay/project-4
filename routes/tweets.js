var express = require('express')
var Tweet = require('../models/Tweet.js')
var tweetRouter = express.Router()

tweetRouter.route('/')
  .get(function(req, res) {
    Tweet.find({}, function(err, data) {
      if (err) throw err;
      res.json(data)
    })
  })


module.exports = tweetRouter
