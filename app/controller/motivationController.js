// controllers/motivationController.js
const Motivation = require('../models/motivationModel');

// Create a new motivation
exports.createMotivation = async (req, res) => {
  try {
    const { quotes } = req.body;
    const motivation = new Motivation({
      quotes
    });
    await motivation.save();
    res.status(201).json(motivation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all motivations
exports.getAllMotivations = async (req, res) => {
  try {
    const motivations = await Motivation.find();
    res.json(motivations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single motivation by ID
exports.getMotivationById = async (req, res) => {
  try {
    const motivation = await Motivation.findById(req.params.id);
    if (!motivation) {
      return res.status(404).json({ error: 'motivation details not found' });
    }
    res.json(motivation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a motivation by ID
exports.updateMotivation = async (req, res) => {
  try {
    const { quotes } = req.body;
    const motivation = await Motivation.findById(req.params.id);
    if (!motivation) {
      return res.status(404).json({ error: 'motivation deatils not found' });
    }
    motivation.quotes = quotes;
    await motivation.save();
    res.json(motivation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a motivation by ID
exports.deleteMotivation = async (req, res) => {
  try {
    const motivation = await Motivation.findById(req.params.id);
    if (!motivation) {
      return res.status(404).json({ error: 'motivation not found' });
    }
    await motivation.remove();
    res.json({ message: 'motivation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
