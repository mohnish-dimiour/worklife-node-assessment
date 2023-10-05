function runTask(userId, title, message, io) {
  if(title == 'water reminder'){
  
    io.emit("water_reminder", `User ID ${userId}: ${message}`);
  }else{
    io.emit("seat_reminder", `User ID ${userId}: ${message}`);
  }

}

function createScheduler(userId, sDate, eDate, frequency, count, title, message, io) {
  let runs = 0;
  const interval = frequency * 60 * 1000; // Calculate the interval in milliseconds
  const schedulerInterval = setInterval(() => {
    const currentDate = new Date();
    const startDate = new Date(sDate);
    const endDate = new Date(eDate);
    if (currentDate >= startDate && currentDate <= endDate && runs < count) {
      runTask(userId, title, message, io);
      runs++;
      console.log(`Run ${runs} - ${new Date()}`);
    }

    if (runs === count || currentDate > endDate) {
      clearInterval(schedulerInterval); // Stop the scheduler
      console.log('Scheduler finished.');
    }
  }, interval);
}

module.exports = {
  runTask,
  createScheduler,
};
