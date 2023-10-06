const socketIo = require('socket.io');
const { createScheduler } = require('../utils/userReminderScheduler'); // Assuming scheduler.js is in the same directory

function configureSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (data) => {
     const {userId} = data
      // Join a room specific to the user
      socket.join(userId);

      socket.on('scheduleMessage', (data) => {
        console.log(data)
        const { userId, startDate, endDate, frequency, count, title, message } = data;

      

        // Schedule and emit messages
        createScheduler(userId, startDate, endDate, frequency, count, title, message, io);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  });

  return io;
}

module.exports = configureSocket;
