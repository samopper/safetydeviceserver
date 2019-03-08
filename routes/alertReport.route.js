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
    if (err) {
      console.log('error saving to database: ', err)
    } else {
      console.log('saved alert to database')
    }
  })

  const accountSid = 'ACecc0e83e82e5a4fe21379ebfa7d1c853'
  const authToken = 'bf41dde94fff6a984ab4d49ff8bb3a64'
  const client = require('twilio')(accountSid, authToken)
  client.messages
    .create({
      body: 'Alert Detected',
      from: '+12039416715',
      to: '+19087831635'
    }).then( (message) => console.log('sent', message.sid))
    
  res.send(JSON.stringify(req.body))
  io.sockets.emit('alert', req.body)
}

exports.get = function(req, res, db){
  const Alert = db.model('Alert', AlertSchema)
  Alert.find({}, function(err, alert) {
    res.send(alert); 
  });
}
