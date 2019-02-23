/*
Entry Point Of Alert Device API
*/

const bearerToken = require('express-bearer-token')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const SocketIO = require('socket.io')
const express = require('express')
const mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb+srv://safetyapi:33mO14rUQQSDSVqGDng9PgPlrW6q@safetydevicecluster-69inf.mongodb.net/alertapi?retryWrites=true')
db.once('open', () => {
  console.log('mongodb online')
})
db.on('error', console.error.bind(console, 'connection error:'))

const apiPort = 8090
const maxqueue = 511
const hostName = null // 'safetydevice.net'

const app = express()

app.use(helmet())
app.use(bearerToken())
app.use(bodyparser.json())

app.get('/', (req, res) => {
  res.send('0h.3.1.1.0 \nU+0000')
  console.log('visitor from ', req.ip)
})

const alertPost = require('./routes/alertReport.route').post
app.route('/api/alerts')
  .post((req, res) => {
    alertPost(req, res, io, db)
  })
  .get((req, res) => {
    console.log('alert get ')
    res.send('good')
  })

app.get('/api/user', (req, res) => {
  res.send('user: ' + JSON.stringify(req.body))
})

app.listen(apiPort, hostName, maxqueue, () => {
  console.log('api listening on port ', apiPort)
})

const ioPort = 8080
const ioOptions = {
  path: '/alert.io', // capture /alert.io
  serveClient: false, // not serving files
  pingInterval: 10000, // send new ping packet interval
  pingTimeout: 5000, // how long without pong before closing connection
  // origins: '*', // allowed origins
  cookie: 'alert.io', // name of http cookie containing client sid
  cookiePath: '/alert.io'
}

const io = new SocketIO(ioPort, ioOptions)
console.log('io listening on port ', ioPort)
// socketio auth middleware
io.use((socket, next) => {
  console.log('auth')
  next()
})

io.on('connect', (socket) => {
  console.log('new socketio connection')
})
