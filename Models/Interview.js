const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema({
  date: Date,
  startTime: Date,
  endTime: Date,
  participants: Array,
});

module.exports = mongoose.model("Interview", InterviewSchema);
