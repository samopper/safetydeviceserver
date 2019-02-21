const mongoose = require('mongoose')

const AlertSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId
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

const Alert = mongoose.model('Alert', AlertSchema)

module.exports = {
  Alert: Alert
}
