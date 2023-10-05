// socketConfig.js
const socketIo = require('socket.io');

function configureSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log(io,"ioooooooooooo")
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
    console.log(socket,"socket")
  });

  return io;
}

module.exports = configureSocket;
