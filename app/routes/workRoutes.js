// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const workController = require('../controller/workController');

// Use authentication middleware for Todo routes
router.use(authMiddleware);

// Todo CRUD endpoints
router.post('/', workController.createWork);
router.get('/:id', workController.getWorkById);
router.get('/', workController.getAllWork);
router.patch('/:id', workController.updateWork);
router.delete('/:id', workController.deleteWork);

module.exports = router;
