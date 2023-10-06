const Motivation = require("../models/motivationModel");

// Handle errors and send a response with status and message
const handleResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

// Create a new motivation
exports.createMotivation = async (req, res) => {
  try {
    const { quotes , author } = req.body;
    const motivation = await Motivation.create({ quotes ,author});
    res.status(201).json(motivation);
  } catch (error) {
    handleResponse(res, 400, error.message);
  }
};

// Get all motivations
exports.getAllMotivations = async (req, res) => {
  try {
    const motivations = await Motivation.find();
    res.json(motivations);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Get a single motivation by ID
exports.getMotivationById = async (req, res) => {
  try {
    const motivation = await Motivation.findById(req.params.id);
    if (!motivation) {
      handleResponse(res, 404, "Motivation details not found");
      return;
    }
    res.json(motivation);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Update a motivation by ID
exports.updateMotivation = async (req, res) => {
  try {
    const { quotes , author } = req.body;
    const motivation = await Motivation.findByIdAndUpdate(req.params.id, { quotes,author }, { new: true });
    if (!motivation) {
      handleResponse(res, 404, "Motivation details not found");
      return;
    }
    res.json(motivation);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};

// Delete a motivation by ID
exports.deleteMotivation = async (req, res) => {
  try {
    const motivation = await Motivation.findByIdAndRemove(req.params.id);
    if (!motivation) {
      handleResponse(res, 404, "Motivation not found");
      return;
    }
    res.json({ message: "Motivation deleted successfully" });
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};
