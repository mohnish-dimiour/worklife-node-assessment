const mongoose = require('mongoose');

const workScheduleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String, 
    required: true,
  },
  jobType: {
    type: String, 
    required: true,
  },
  lunchStartTime: {
    type: String, 
  },
  lunchEndTime: {
    type: String, 
  },
});

module.exports = mongoose.model('WorkSchedule', workScheduleSchema);
