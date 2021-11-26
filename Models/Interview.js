const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema({
  startTime: Date,
  endTime: Date,
  participants: Array,
});

module.exports = mongoose.model("Interview", InterviewSchema);
