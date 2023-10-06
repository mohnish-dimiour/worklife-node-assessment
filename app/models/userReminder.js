const mongoose = require("mongoose");

const userReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reminderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reminder",
    required: true,
  },
  count: {
    type: Number,
    default: 0, // Default value for the count field
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active", // Default value for the status field
  },
});

module.exports = mongoose.model("UserReminder", userReminderSchema);
