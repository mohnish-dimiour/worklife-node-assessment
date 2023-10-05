// controllers/WorkController.js
const Reminder = require("../models/reminderModel"); // Update the model import

// Create a new Reminder
exports.createReminder = async (req, res) => {
  try {
    const { title, description } = req.body;
    const reminder = new Reminder({
      title,
      description,
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Reminder by ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder details not found" });
    }
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Reminder by ID
exports.updateReminder = async (req, res) => {
  try {
    const { title, description } = req.body;
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder details not found" });
    }
    reminder.title = title;
    reminder.description = description;
    await reminder.save();
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a Reminder by ID
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    await reminder.remove();
    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
