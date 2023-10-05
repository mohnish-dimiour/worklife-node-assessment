const mongoose = require('mongoose');

const motivationSchema = new mongoose.Schema({
  quotes: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('Motivation', motivationSchema);
