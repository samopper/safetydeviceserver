/*
user document model
*/
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  photourl: {
    type: String
  }
})

const User = mongoose.model('User', UserSchema)

module.exports.User = User
