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
  .post(function(req, res) {
    Tweet.create(req.body, function(err, tweet) {
      if (err) throw err;
      res.json({newTweet: tweet, success: true})
    })
  })


module.exports = tweetRouter
