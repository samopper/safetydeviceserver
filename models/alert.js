/*
alert document model
*/
const mongoose = require('mongoose')

const AlertSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  accuracy: {
    type: Number
  }
})

module.exports = AlertSchema
