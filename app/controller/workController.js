// controllers/WorkController.js
const Work = require("../models/workScheduleModel");

// Create a new Work
exports.createWork = async (req, res) => {
  try {
    const { jobType, lunchStartTime, lunchEndTime, startTime, endTime } =
      req.body;
    const work = new Work({
      jobType,
      lunchStartTime,
      lunchEndTime,
      startTime,
      endTime,
      userId: req.userData.userId, // Extracted from the token in authMiddleware
    });
    await work.save();
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Work by ID
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work || work.user.toString() !== req.userData.userId) {
      return res.status(404).json({ error: "Work details not found" });
    }
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Work by ID
exports.updateWork = async (req, res) => {
  try {
    const { jobType, lunchStartTime, lunchEndTime, startTime, endTime  } = req.body;
    const work = await Work.findById(req.params.id);
    if (!work || work.user.toString() !== req.userData.userId) {
      return res.status(404).json({ error: "Work deatils not found" });
    }
    work.jobType = jobType;
    work.lunchStartTime = lunchStartTime;
    work.startTime = startTime;
    work.endTime = endTime;
    work.lunchEndTime = lunchEndTime;
    await work.save();
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a Work by ID
exports.deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work || work.user.toString() !== req.userData.userId) {
      return res.status(404).json({ error: "work not found" });
    }
    await work.remove();
    res.json({ message: "Work deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
