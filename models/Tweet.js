var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tweetSchema = new Schema ({
  body: String,
  title: String,
},
{
  timestamps: true
})

var Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
