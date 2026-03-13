const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  topic: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    enum: ["Easy","Medium","Hard"],
    required: true
  },

  link: {
    type: String,
    required: true
  }

},{timestamps:true});

module.exports = mongoose.model("Problem", problemSchema);