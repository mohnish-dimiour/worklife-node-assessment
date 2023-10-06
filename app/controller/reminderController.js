const Reminder = require("../models/reminderModel");

// Handle errors and send a response with status and message
const handleResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

// Create a new Reminder
exports.createReminder = async (req, res) => {
  try {
    const { title, description } = req.body;
    const reminder = await Reminder.create({ title, description });
    res.status(201).json(reminder);
  } catch (error) {
    handleResponse(res, 400, error.message);
  }
};

// Get a single Reminder by ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      handleResponse(res, 404, "Reminder details not found");
      return;
    }
    res.json(reminder);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Update a Reminder by ID
exports.updateReminder = async (req, res) => {
  try {
    const { title, description } = req.body;
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!reminder) {
      handleResponse(res, 404, "Reminder details not found");
      return;
    }
    res.json(reminder);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Delete a Reminder by ID
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndRemove(req.params.id);
    if (!reminder) {
      handleResponse(res, 404, "Reminder not found");
      return;
    }
    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Get all Reminders
exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({});
    res.json(reminders);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};
