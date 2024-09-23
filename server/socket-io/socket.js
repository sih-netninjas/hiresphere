module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('[socket] Connected: ', socket.id)

    // Handling rooms
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

    // WebRTC Signaling Logic
    // I have kept it in same file for now but later just move it to different file :D ...
    // Handle offer from a peer
    socket.on('offer', (data) => {
      console.log('[socket] Sending offer to: ', data.target)
      socket.to(data.target).emit('offer', {
        sdp: data.sdp,
        sender: socket.id,
      })
    })

    // Handle answer from a peer
    socket.on('answer', (data) => {
      console.log('[socket] Sending answer to: ', data.target)
      socket.to(data.target).emit('answer', {
        sdp: data.sdp,
        sender: socket.id,
      })
    })

    // Handle ICE candidates
    socket.on('iceCandidate', (data) => {
      console.log('[socket] Sending ICE candidate to: ', data.target)
      socket.to(data.target).emit('iceCandidate', {
        candidate: data.candidate,
        sender: socket.id,
      })
    })

    socket.on('disconnect', () => {
      console.log('[socket] Disconnected: ', socket.id)
    })
  })
}
