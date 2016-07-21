var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema ({
  body: String,
  title: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  spoilers: Boolean
},
{
  timestamps: true
})

var Review = mongoose.model('Review', reviewSchema)

module.exports = Review
