/*
Entry Point Of Alert Device API
*/
const express = require('express')
const bearerToken = require('express-bearer-token')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = 3000

app.use(helmet())
app.use(bearerToken())
app.use(bodyparser.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/alerts', (req, res) => {
  res.send('alerts: ' + JSON.stringify(req.body))
})

app.post('/api/alerts', (req, res) => {
  res.send('alerts: ' + JSON.stringify(req.body))
})

app.get('/api/user', (req, res) => {
  res.send('user: ' + JSON.stringify(req.body))
})

io.on('connection', (socket) => {
  console.log('new connection: ', socket)
})

server.listen(port)
console.log('listening on port ', port)
