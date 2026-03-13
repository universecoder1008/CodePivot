const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  score: Number,

  total: {
    type: Number,
    default: 30
  },

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("TestResult", testResultSchema);