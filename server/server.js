const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/database')
/*
GLOBALS
*/
const PORT = 3000
const app = express()
const server = http.createServer(app)
const io = socketio(server, { cors: { origin: '*' } })

/*
MIDDLEWARE
*/
app.use(bodyParser.json())
app.use(
  cors({
    origin: '*',
  })
)
/*
Connecting to MongoDB
*/
connectDB()
/*
Socket IO setup
*/
require('./socket-io/socket')(io)

/*
ROUTES
*/
app.use('/user', require('./routes/user.routes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
