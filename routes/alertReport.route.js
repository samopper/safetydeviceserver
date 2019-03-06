// report alert endpoint
const AlertSchema = require('../models/alert')
const mongoose = require('mongoose')

exports.post = function (req, res, io, db) {
  const Alert = db.model('Alert', AlertSchema)
  console.log(req.body)
  var alert = new Alert(req.body)
  alert.date = Date.now()
  alert.userID = mongoose.Types.ObjectId(req.userID)
  alert.save((err, a) => {
    console.log('callback')
    if (err) {
      console.log('error saving to database: ', err)
    } else {
      console.log('saved alert to database')
    }
  })
  res.send(JSON.stringify(req.body))
  io.sockets.emit('alert', req.body)
}

exports.get = function(req, res, db){
  const Alert = db.model('Alert', AlertSchema)
  Alert.find({}, function(err, alert) {
    res.send(alert);  
  });
}
