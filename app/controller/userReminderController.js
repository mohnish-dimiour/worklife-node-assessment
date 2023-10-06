const UserReminder = require("../models/userReminderModel");
const Reminder = require("../models/reminderModel");

// Handle errors and send a response with status and message
const handleResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

// Create a new user reminder
exports.createUserReminder = async (req, res) => {
  try {
    const { userId, reminderId, count, frequency, startDate, endDate, status } =
      req.body;
    const userReminder = new UserReminder({
      userId,
      reminderId,
      count,
      frequency,
      startDate,
      endDate,
      status,
    });
    await userReminder.save();

    res.status(201).json(userReminder);
  } catch (error) {
    handleResponse(res, 400, error.message);
  }
};

// Update a user reminder by ID
exports.updateUserReminder = async (req, res) => {
  try {
    const { userId, reminderId, count, frequency, startDate, endDate, status } =
      req.body;
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return handleResponse(res, 404, "User reminder details not found");
    }
    userReminder.userId = userId;
    userReminder.reminderId = reminderId;
    userReminder.count = count;
    userReminder.frequency = frequency;
    userReminder.startDate = startDate;
    userReminder.endDate = endDate;
    userReminder.status = status;
    await userReminder.save();

    res.json(userReminder);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Get all user reminders by user ID
exports.getAllRemindersByUserId = async (req, res) => {
  try {
    const userId = req.userData.userId; // Assuming you pass the user ID as a parameter
    const reminders = await UserReminder.find({ userId }).populate(
      "reminderId"
    );
    res.json(reminders);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Get a single user reminder by ID
exports.getUserReminderById = async (req, res) => {
  try {
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return handleResponse(res, 404, "User reminder details not found");
    }
    res.json(userReminder);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Delete a user reminder by ID
exports.deleteUserReminder = async (req, res) => {
  try {
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return handleResponse(res, 404, "User reminder not found");
    }
    await userReminder.remove();
    res.json({ message: "User reminder deleted successfully" });
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};
