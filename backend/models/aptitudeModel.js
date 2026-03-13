const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
  topic: String,
  difficulty: String
});

module.exports = mongoose.model("Aptitude", aptitudeSchema);