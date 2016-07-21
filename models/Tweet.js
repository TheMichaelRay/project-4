var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema ({
  body: String,
  title: String,
},
{
  timestamps: true
})

var Review = mongoose.model('Review', tweetSchema)

module.exports = Review
