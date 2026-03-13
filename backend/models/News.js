const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  source: String,
  date: String,
  category: {
    type: String,
    enum: ["Hiring", "Referral", "Contest", "Internship"]
  },
  url: String
},{timestamps:true});

module.exports = mongoose.model("News",newsSchema);