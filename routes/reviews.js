var express = require('express')
var Review = require('../models/Review.js')
var reviewRouter = express.Router()

reviewRouter.route('/')
  .get(function(req, res) {
    Review.find({}).populate('author').exec(function(err, reviews) {
      if (err) throw err;
      res.json(reviews)
    })
  })
  .post(function(req, res) {
    Review.create(req.body, function(err, review) {
      if (err) throw err;
      res.json({newReview: review, success: true})
    })
  })


module.exports = reviewRouter
