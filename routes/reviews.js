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

reviewRouter.route('/:id')
  .get(function(req, res) {
    Review.findById(req.params.id, function(err, review) {
      if (err) throw err;
      res.json({success: true, review: review})
    })
  })
  .delete(function(req, res) {
    // res.json({success: true, message: 'deleted'})
    Review.findByIdAndRemove(req.params.id, function(err, review) {
      if (err) throw err;
      res.json({success: true, review: review})
    })
  })
  .patch(function(req, res) {
    Review.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, review) {
      if (err) throw err;
      res.json({success: true, review: review})
    })
  })

module.exports = reviewRouter
