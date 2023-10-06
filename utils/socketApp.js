const socketIo = require('socket.io');

function configureSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log(socket)
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

  });

  return io;
}

module.exports = configureSocket;
