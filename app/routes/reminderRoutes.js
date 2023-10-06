// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const reminderController = require('../controller/reminderController'); // Updated controller name

// Use authentication middleware for Todo routes
// router.use(authMiddleware);

// Reminder CRUD endpoints
router.get('/', reminderController.getAllReminders); // Updated route path and controller function name
router.post('/', reminderController.createReminder); // Updated route path and controller function name
router.patch('/:id', reminderController.updateReminder); // Updated route path and controller function name
router.get('/:id', reminderController.getReminderById); // Updated route path and controller function name
router.delete('/:id', reminderController.deleteReminder); // Updated route path and controller function name

module.exports = router;
