const io = require('socket.io-client')('http://localhost:8080', {
  path: '/alert.io'
})

io.on('connect', () => {
  console.log('conected')
})

io.on('alert', (data) => {
  console.log('alert : ', data)
})
