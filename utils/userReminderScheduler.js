const schedule = require("node-schedule");
function createScheduler(
  startDateTime,
  endDateTime,
  startWorkTime,
  count,
  frequency,
  io,
  reminder,
  userId
) {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const startTime = new Date(startWorkTime); //startWorkTime * 60 * 60 * 1000; // Convert start work time to milliseconds

  let taskCount = 0;
  
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
  

  console.log("Scheduler started.");
}

module.exports = {
  createScheduler,
};
