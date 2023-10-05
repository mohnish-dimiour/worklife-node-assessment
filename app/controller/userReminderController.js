// controllers/userReminderController.js
const UserReminder = require('../models/userReminderModel');
const Reminder = require("../models/reminderModel");
const { createScheduler } = require('../../utils/userReminderScheduler'); // Import the scheduler function

// Create a new user reminder
exports.createUserReminder = async (req, res) => {
  try {
    const {
      userId,
      reminderId,
      count,
      frequency,
      startDate,
      endDate,
      status,
    } = req.body;
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
    const reminder = await Reminder.findById(reminderId);
    // After successfully creating the user reminder, call createScheduler
    createScheduler(userId, startDate, endDate, frequency, count, reminder.title,reminder.description,req.io);

    res.status(201).json(userReminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user reminder by ID
exports.updateUserReminder = async (req, res) => {
  try {
    const {
      userId,
      reminderId,
      count,
      frequency,
      startDate,
      endDate,
      status,
    } = req.body;
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return res.status(404).json({ error: 'User reminder details not found' });
    }
    userReminder.userId = userId;
    userReminder.reminderId = reminderId;
    userReminder.count = count;
    userReminder.frequency = frequency;
    userReminder.startDate = startDate;
    userReminder.endDate = endDate;
    userReminder.status = status;
    await userReminder.save();
    const reminder = await Reminder.findById(reminderId);
    // After successfully updating the user reminder, call createScheduler
    createScheduler(userId, startDate, endDate, frequency, count, reminder.title,reminder.description,req.io);

    res.json(userReminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getAllRemindersByUserId = async (req, res) => {
  try {
    const userId = req.userData.userId; // Assuming you pass the user ID as a parameter
    const reminders = await UserReminder.find({ userId });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single user reminder by ID
exports.getUserReminderById = async (req, res) => {
  try {
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return res.status(404).json({ error: 'User reminder details not found' });
    }
    res.json(userReminder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete a user reminder by ID
exports.deleteUserReminder = async (req, res) => {
  try {
    const userReminder = await UserReminder.findById(req.params.id);
    if (!userReminder) {
      return res.status(404).json({ error: 'User reminder not found' });
    }
    await userReminder.remove();
    res.json({ message: 'User reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
