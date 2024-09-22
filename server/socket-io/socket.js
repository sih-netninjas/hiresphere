module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('[socket] Connected: ', socket.id)

    // Handling rooms :
    socket.on('joinRoom', (data) => {
      console.log('[socket] Joining room: ', data.room)
      socket.join(data.room)
    })

    socket.on('leaveRoom', (data) => {
      socket.leave(data.room)
    })

    socket.on('sendMessage', (messageData) => {
      io.to(messageData.room).emit('receiveMessage', messageData)
    })

    socket.on('disconnect', () => {
      console.log('[socket] Disconnected: ', socket.id)
    })
  })
}
