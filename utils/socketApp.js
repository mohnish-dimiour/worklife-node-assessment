const schedule = require("node-schedule");
function configureSocket(io, cb) {
  console.log("asdasd");
  try {
    io.on("connection", (socket) => {
      cb(socket);
      socket.on("joinRoom", (data) => {
        const { userId } = data;
        // Join a room specific to the user
        socket.join(userId);
        socket.on("scheduleMessage", (data) => {
          const {
            startDateTime,
            endDateTime,
            workStartTime,
            count,
            frequency,
            reminder,
            userId
          } = data;
          console.log("called")
          const startDate = new Date(startDateTime);
          const endDate = new Date(endDateTime);
          const startTime = new Date(workStartTime); //startWorkTime * 60 * 60 * 1000; // Convert start work time to milliseconds
        
          let taskCount = 0;
            io.to(userId).emit("sendNotification", reminder)
            // Schedule the task using node-schedule
            const job = schedule.scheduleJob(startDate, function () {
              if (taskCount < count && new Date() < endDate) {
                taskCount++;
                // Calculate the delay for the next task based on the frequency
                const nextTaskDelay = startTime + taskCount * frequency * 1000;
                // Reschedule the task
                setTimeout(() => {
                  job.reschedule(new Date(Date.now() + nextTaskDelay));
                }, nextTaskDelay);
              } else {
                console.log("Scheduler stopped.");
                job.cancel();
              }
            });  
          
        });

        socket.on("disconnect", () => {
          console.log("User disconnected");
        });
      });
    });
    return io;
  } catch (error) {
    console.log(error);
  }
}

module.exports = configureSocket;
