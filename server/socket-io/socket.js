module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected')

    // Handle incoming messages
    socket.on('sendMessage', (messageData) => {
      // Emit the message to all connected clients
      io.emit('receiveMessage', messageData)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })
}
