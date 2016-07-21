var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema,
  userSchema = new Schema ({
    local: {
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true}
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: String,
    bio: String,
    age: {type: String, required: true, min: 18},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
  },
  {
    timestamps: true
  })

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
