const mongoose = require("mongoose");
const Interview = require("./Interview.js");

const UserSchema = mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
