// routes/MotivationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const motivationController = require('../controller/motivationController');

// Use authentication middleware for Motivation routes
router.use(authMiddleware);

// Motivation CRUD endpoints
router.post('/', motivationController.createMotivation);
router.get('/', motivationController.getAllMotivations);
router.get('/:id', motivationController.getMotivationById);
router.patch('/:id', motivationController.updateMotivation);
router.delete('/:id', motivationController.deleteMotivation);

module.exports = router;
