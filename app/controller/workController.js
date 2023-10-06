const Work = require("../models/workScheduleModel");

// Handle errors and send a response with status and message
const handleResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

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
    handleResponse(res, 400, error.message);
  }
};

// Get a single Work by ID
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work || work.userId.toString() !== req.userData.userId) {
      return handleResponse(res, 404, "Work details not found");
    }
    res.json(work);
  } catch (error) {
    handleResponse(res, 500, error);
  }
};

// Update a Work by ID
exports.updateWork = async (req, res) => {
  try {
    const { jobType, lunchStartTime, lunchEndTime, startTime, endTime } =
      req.body;
    const work = await Work.findById(req.params.id);
    // if (!work || work.userId.toString() !== req.userData.userId) {
    if (!work) {
      return handleResponse(res, 404, "Work details not found");
    }
    work.jobType = jobType;
    work.lunchStartTime = lunchStartTime;
    work.startTime = startTime;
    work.endTime = endTime;
    work.lunchEndTime = lunchEndTime;
    await work.save();
    res.json(work);
  } catch (error) {
    handleResponse(res, 500, error);
  }
};

// Delete a Work by ID
exports.deleteWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work || work.userId.toString() !== req.userData.userId) {
      return handleResponse(res, 404, "Work not found");
    }
    await work.remove();
    res.json({ message: "Work deleted successfully" });
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};


// Get all Work entries
exports.getAllWork = async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (error) {
    handleResponse(res, 500, "Internal Server Error");
  }
};