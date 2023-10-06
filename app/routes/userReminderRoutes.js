// routes/userReminderRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const userReminderController = require('../controller/userReminderController');

// Use authentication middleware for User Reminder routes

// router.use(authMiddleware);

// User Reminder CRUD endpoints
router.post('/', userReminderController.createUserReminder);
router.get('/:id', userReminderController.getUserReminderById);
router.patch('/:id', userReminderController.updateUserReminder);
router.delete('/:id', userReminderController.deleteUserReminder);

// Get all reminders by user ID
router.get('/', userReminderController.getAllRemindersByUserId);

module.exports = router;
